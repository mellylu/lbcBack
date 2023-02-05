const ToolsAd = require("../models/toolsAd.model");

exports.post = (req, res) => {
    const toolsAd = new ToolsAd({
        category : req.body.category,
        univers : req.body.univers,
        type : req.body.type,
        brand : req.body.brand,
        material : req.body.material,
        color : req.body.color,
        state : req.body.state,
    });
    toolsAd.save()
        .then((data) => {
            res.status(200).send({
                toolsAd : data,
                isCreated : true 
            })
        })
        .catch((err) => {
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        })
}



//GET ID
exports.getElement = (req, res) => {
    // console.log(ToolsAd.findOne())
    // ToolsAd.findById(req.params.id)
    // .then((data) => {
    //     res.send({
    //         ad : data
    //     })
    // })
    // .catch((err) => {
    //     res.status(500).send({
    //         message : err.message || "Some error occured"
    //     })
    // })
}
