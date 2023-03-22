const Ad = require("../models/ad.model");

exports.post = (req, res) => {
    const ad = new Ad({
        name : req.body.name,
        category : req.body.category,
        univers : req.body.univers,
        type : req.body.type,
        brand : req.body.brand,
        material : req.body.material,
        color : req.body.color,
        state : req.body.state,
        description : req.body.description,
        price : req.body.price,
        image : req.body.image,
        localization: req.body.localization,
        userad: req.body.userad,
        date: Date.now()
    });
    ad.save()
        .then((data) => {
            res.status(200).send({
                ad : data,
                isCreated : true 
            })
        })
        .catch((err) => {
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        })
}


//GET ALL
exports.getAll = (req, res) => {
    const page = parseInt(req.query.page);
    const limit = 5;
    let total = null;
    Ad.find().then((data)=> {
        total = data.length / 5 - 1
        let ad = Ad.find();
        if (req.query.page){
            ad = ad.skip(page * limit).limit(limit)
        }
        if (req.query.sort){
            var sort = { [req.query.sort]: 1 };
            ad = ad.sort(sort)
        }
        ad
        .then((data) => {
            res.send({
                total : total,
                ad : data
            })
        })
        .catch((err) => {
            res.status(500).send({
                error: 500,
                message: err.message
            })
        })
    })
    
}


//GET ID
exports.getId = (req, res) => {
    const ad = Ad.findById(req.params.id)
    .populate({
        path:"userad",
        populate:{
            path:"user",
            model:"User"
        }
    })
    .then((data) => {
        res.send({
            ad : data
        })
    })
    .catch((err) => {
        res.status(500).send({
            message : err.message || "Some error occured"
        })
    })
}

//UPDATE
exports.update = (req, res) => {
    const ad = Ad.findByIdAndUpdate(req.params.id, {
        name : req.body.name,
        category : req.body.category,
        univers : req.body.univers,
        type : req.body.type,
        brand : req.body.brand,
        material : req.body.material,
        color : req.body.color,
        state : req.body.state,
        description : req.body.description,
        price : req.body.price,
        image : req.body.image,
        localization: req.body.localization,
        userad: req.body.userad,
        date: Date.now()
    })
    .then(() => {
        Ad.findById(req.params.id)
            .populate({
                path:"userad",
                populate:{
                    path:"user",
                    model:"User"
                }
            })
            .then((data) => {
                res.send({
                    ad : data,
                    update : true
                })
            })
            .catch((err) => {
                res.status(500).send({
                    message : err.message || "Some error occured"
                })
            })
    })
}

//DELETE
exports.delete = (req, res) => {
    const ad = Ad.findByIdAndDelete(req.params.id)
    .then(() => {
        res.send({
            delete : true
        })
    })
    .catch((err) => {
        res.status(500).send({
            message : err.message || "Some error occured"
        })
    })
}



