const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
var secret = process.env.JWT_SECRET;

const sendEmail = require("../utils/sendEmailForVerifyEmail")

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
                token: userToken
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
        password: bcrypt.hashSync(req.body.password, saltRounds),
        favoris: req.body.favoris
    })
        .then(() => {
            User.findById(req.params.id)
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

exports.verifyToken = (req, res) => {
    if (req.user) {
        res.status(200).json({ verify: true })
    }
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
