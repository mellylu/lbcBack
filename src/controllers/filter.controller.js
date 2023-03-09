const Filter = require("../models/filter.model");

exports.post = (req, res) => {
    const filter = new Filter({
        category : req.body.category,
        univers : req.body.univers,
        size : req.body.size,
        type : req.body.type,
        brand : req.body.brand,
        material : req.body.material,
        color : req.body.color,
        state : req.body.state,
    });
    filter.save()
        .then((data) => {
            res.status(200).send({
                filter : data,
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
    Filter.find()
    .then((data) => {
        if ("category" in req.query){
            data = data.filter(filter => filter.category == req.query.category);
        }
        res.send({
            filter : data
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
exports.getElement = (req, res) => {
    Filter.findOne({"category" : req.body.category})
    .then((data) => {
        console.log(data)
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

exports.delete = (req, res) => {
    Filter.findByIdAndDelete(req.params.id)
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
