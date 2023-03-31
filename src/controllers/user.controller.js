const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
var secret = process.env.JWT_SECRET;

const sendEmail = require("../utils/sendEmailForVerifyEmail")
const sendMessage = require ("../utils/sendMessage");


//Register
exports.register = (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        username : req.body.username,
        email : req.body.email,
        isAdmin : false,
        password : hashedPassword
    });
    user.save()
        .then((data) => {
            let userToken = jwt.sign({
                id: data._id,
                isAdmin: data.isAdmin
            },
                secret,
                {
                    expiresIn: 86400
                }
            )
            res.status(200).send({
                user : data,
                auth : true,
                isCreated : true,
                token: userToken
            })
        })
        .catch((err) => {
            res.status(500).send({
                success : false,
                message : err.message || "Some error occured"
            })
        })
}

//si adresse email exist
exports.emailexist = (req, res) => {
    User.findOne({ "email": req.body.email })
        .then((user) => {
            if (user === null){
                res.status(200).send({
                    message: "adresse email is not exist",
                    register: true,
                    email: req.body.email
                })
            }
            else{
                res.status(403).send({
                    message: "adresse email existe déjà",
                    register: false,
                })
            }
        })
        .catch(err => console.log(err))
}

//LOGIN
exports.login = (req, res) => {
    User.findOne({ "email": req.body.email })
        .then((user) => {
            let passwordValid = bcrypt.compareSync(req.body.password, user.password)
            if (!passwordValid) {
                console.log("erreur")
                return res.status(401).send({
                    message: "password not valid",
                    auth: false,
                    token: null
                })
            }
            let userToken = jwt.sign({
                id: user._id,
                isAdmin: User.isAdmin
            },
                secret,
                {
                    expiresIn: 86400
                }
            )
            res.status(200).send({
                auth: true,
                token: userToken,
                username: user.username,
                id: user._id,
                image: user.image,
            })
        })
        .catch((err) => res.status(404).send({ error: `err : ${err}` }))
}

//GET ALL
exports.getAll = (req, res) => {
    User.find()
        .then((data) => {
            res.send({
                user: data
            })
        })
        .catch((err) => {
            res.status(500).send({
                error: 500,
                message: err.message
            })
        })
}

//GET ID
exports.getId = (req, res) => {
    const user = User.findById(req.params.id)
    .populate({
        path:"announcement",
        populate:{
            path:"ad",
            model:"Ad"
        }
    })
    .populate({
        path:"favorite",
            populate:{
                path:"ad",
                model:"Ad"
            }
    })
        .then((data) => {
            res.send({
                user: data
            })
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured"
            })
        })
}

//UPDATE
exports.update = (req, res) => {
    const user = User.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username : req.body.username,
        email: req.body.email,
        announcement: req.body.announcement,
        favorite: req.body.favorite,
        image: req.body.image,
        recentSearch: req.body.recentSearch,
        //password: bcrypt.hashSync(req.body.password, saltRounds),
    })
        .then(() => {
            User.findById(req.params.id)
            .populate({
                path:"announcement",
                populate:{
                    path:"ad",
                    model:"Ad"
                }
            })
            .populate({
                path:"favorite",
                populate:{
                    path:"ad",
                    model:"Ad"
                }
            })
                .then((data) => {
                    res.send({
                        user: data,
                        update: true
                    })
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.message || "Some error occured"
                    })
                })
        })
}

//DELETE
exports.delete = (req, res) => {
    const user = User.findByIdAndDelete(req.params.id)
        .then((data) => {
            res.send({
                delete: true
            })
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured"
            })
        })
}

//DELETEANNOUNCEMENT
exports.deleteAnnouncement = (req, res) => {
   const user = User.findById(req.params.idUser)
   user
   .then((data) => {
        data.announcement = data.announcement.filter((x) =>
            x._id.toString() !== req.params.idAd,
        )
        User.findByIdAndUpdate(req.params.idUser, {
            announcement : data.announcement
        })
        .then(()=> {
            res.send({
                delete: true
            })
        })
        .catch((err) => {
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        })
        
        })//http://localhost:5000/api/v1/users/6412e513a64ab4bc96934483/6412e575a64ab4bc9693448d
    .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured"
            })
        })
}

//DELETEFAVORIS
exports.deleteFavoris = (req, res) => {
    const user = User.findById(req.params.idUser)
    user
    .then((data) => {
         data.favoris = data.favoris.filter((x) =>
             x._id.toString() !== req.params.idAd,
         )
         User.findByIdAndUpdate(req.params.idUser, {
             favoris : data.favoris
         })
         .then(()=> {
             res.send({
                 delete: true
             })
         })
         .catch((err) => {
             res.status(500).send({
                 message : err.message || "Some error occured"
             })
         })
         
         })//http://localhost:5000/api/v1/users/6412e513a64ab4bc96934483/6412e575a64ab4bc9693448d
     .catch((err) => {
             res.status(500).send({
                 message: err.message || "Some error occured"
             })
         })
 }

exports.verifyemail = (req, res) => {
    if (req.body.email) {
        min = Math.ceil(1);
        max = Math.floor(99999);
        numberrandom = Math.floor(Math.random() * (max - min)) + min;
        sendEmail.sendEmail(req, res, numberrandom, req.body.email)
        .then((data) => {
            res.status(200).json({ email: 'ok', number : numberrandom})
        })
        .catch((err)=> {res.status(500).json({ message: err})})
        
    }
}

exports.verifyphone = (req, res) => {
    if (req.body.phone) {
        min = Math.ceil(1);
        max = Math.floor(99999);
        numberrandom = Math.floor(Math.random() * (max - min)) + min;
        console.log("1111111")
        sendMessage.sendMessage(req, res, numberrandom, req.body.phone)
        .then((data) => {
            res.status(200).json({ message: 'ok', number : numberrandom})
        })
        .catch((err)=> {res.status(500).json({ message: err})})
    }
}


//middleware : une fonction que tu places au milieur de deux opérations


exports.verifyToken = (req, res) => {  //fonction réutilisable, peut agir en tant que controller
    let token = req.headers.authorization//récupérer le token qui est dans le header de la requête dans le libellé authorization
    console.log(token);
    if (!token) { // est ce que on a un token, si il est bon ou pas
        
        return res.status(403).send({
            auth : false,
            token : null,
            message : 'Missing token'
        })
    }
    jwt.verify(token, process.env.JWT_SECRET, //on verifie le token, 1er paramètre : le token, 2ème paramètre la signature
    function(error, jwtdecoded) { //user pas valide / il a expiré, jswtdecoded : infos du jwt qui sont décodées (idadmin et id de l'utilisateur)
        console.log('testd')
        if (error) {
            return res.status(401).send({
                auth : false,
                token : null,
                message : "not authorized"
            })
        }
        else{
            return res.status(200).send({
                auth : true,
            })
        }
        
})
}

