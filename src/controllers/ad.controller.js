const { EventListInstance } = require("twilio/lib/rest/api/v2010/account/call/event");
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
        country: req.body.country,
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
        if (req.query.sort){
            var sort = { [req.query.sort]: 1 };
            ad = ad.sort(sort)
        }
        if (req.query.page){
            ad = ad.skip(page * limit).limit(limit)
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

exports.getAllFilter = (req, res) => {
    Ad.find().then((data)=> {
        
        total = data.length / 5 - 1
        if(req.query.category){
            data = data.filter( (element) => element.category === req.query.category );
        }
        if (req.query.search){
            data = data.filter( (element) => element.name.includes(req.query.search) );
        }
        if (req.query.lat && req.query.lng){
            const v = []
            data = data.filter( (element) => {
                req.query.lat=Number(req.query.lat)
                req.query.lng=Number(req.query.lng)
                if(element.localization.lat === req.query.lat && element.localization.lng === req.query.lng)
                {
                    v.push(element)
                }
                element.localization.lat === req.body.lat && element.localization.lng === req.body.lng
            });
            data = v
        }
        if (req.query.sort){
            sort = req.query.sort
            data = data.sort((a, b) => (a[sort] > b[sort] ? 1 : -1))
        }
        if (req.query.type){
            tabType = req.query.type.split(",")
            if (tabType.length === 1){
                data = data.filter( (element) => element.type === req.query.type );
            }
            else {
                let tabfiltre = []
                tabType.forEach(el => {
                   data.filter( (element) => 
                        {
                            if (element.type === el){
                                tabfiltre.push(element)
                            }
                        })
                });
                data = tabfiltre
                
            }
        }
        let b = []
        let nb = 3
        let top = false
        let bottom = false
        req.query.page=Number(req.query.page)
        req.query.page = req.query.page * 3
        if (nb + req.query.page >= data.length){
            top = true
        }
        if (req.query.page === 0){
            bottom = true
        }
        
        for(let i = req.query.page; i < nb + req.query.page; i++){
            if(i<data.length){
                b.push(data[i])
            }
        }
        data = b
        
        
       
        res.status(200).send({
            ad :data,
            top : top,
            bottom : bottom
        })
        
    })
    .catch((err)=>{
        res.status(500).send({
            error:500,
            message: err.message
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
        country: req.body.country,
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



