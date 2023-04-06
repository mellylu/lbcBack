const { EventListInstance } = require("twilio/lib/rest/api/v2010/account/call/event");
const Ad = require("../models/ad.model");
const User = require("../models/user.model");

exports.post = (req, res) => {
    let today = new Date()
    let todayGetDate = ""
    let todayGetMonth = ""
    let todayGetFullYear = ""
    let todayGetHours = ""
    let todayGetMinutes = ""
    if (today.getDate().toString().length === 1){
        todayGetDate = `0${today.getDate().toString()}`
    }
    else{
        todayGetDate = today.getDate().toString()
    }
    if (today.getMonth().toString().length === 1){
        todayGetMonth = `0${today.getMonth().toString()}`
    }
    else{
        todayGetMonth = today.getMonth().toString()
    }
    todayGetFullYear = today.getFullYear().toString()
    todayGetHours = today.getHours().toString()
    todayGetMinutes = today.getMinutes().toString()
    let dateToday = `${todayGetDate}/${todayGetMonth}/${todayGetFullYear} à ${todayGetHours}:${todayGetMinutes}`
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
        date: dateToday,
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
    Ad.find().then((data)=> {
        Ad.find()
        
        .then((data) => {
            res.send({
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
        if (req.query.univers){
            let tabUnivers = req.query.univers.split(",")
            if (tabUnivers.length === 1){
                data = data.filter( (element) => element.univers === req.query.univers );
            }
            else {
                let tabfiltre = []
                tabUnivers.forEach(el => {
                   data.filter( (element) => 
                        {
                            if (element.univers === el){
                                tabfiltre.push(element)
                            }
                        })
                });
                data = tabfiltre
                
            }
        }
        if (req.query.size){
            let tabSize = req.query.size.split(",")
            if (tabSize.length === 1){
                data = data.filter( (element) => element.size === req.query.size );
            }
            else {
                let tabfiltre = []
                tabSize.forEach(el => {
                   data.filter( (element) => 
                        {
                            if (element.size === el){
                                tabfiltre.push(element)
                            }
                        })
                });
                data = tabfiltre
                
            }
        }
        if (req.query.type){
            let tabType = req.query.type.split(",")
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

        if (req.query.material){
            let tabMaterial = req.query.material.split(",")
            if (tabMaterial.length === 1){
                data = data.filter( (element) => element.material === req.query.material );
            }
            else {
                let tabfiltre = []
                tabMaterial.forEach(el => {
                   data.filter( (element) => 
                        {
                            if (element.material === el){
                                tabfiltre.push(element)
                            }
                        })
                });
                data = tabfiltre
                
            }
        }
        if (req.query.brand){
            let tabBrand = req.query.brand.split(",")
            if (tabBrand.length === 1){
                data = data.filter( (element) => element.brand === req.query.brand );
            }
            else {
                let tabfiltre = []
                tabBrand.forEach(el => {
                   data.filter( (element) => 
                        {
                            if (element.brand === el){
                                tabfiltre.push(element)
                            }
                        })
                });
                data = tabfiltre
                
            }
        }
        
        if (req.query.color){
            let tabColor = req.query.color.split(",")
            if (tabColor.length === 1){
                data = data.filter( (element) => element.color === req.query.color );
            }
            else {
                let tabfiltre = []
                tabColor.forEach(el => {
                   data.filter( (element) => 
                        {
                            if (element.color === el){
                                tabfiltre.push(element)
                            }
                        })
                });
                data = tabfiltre
                
            }
        }
        if (req.query.state){
            let tabState = req.query.state.split(",")
            if (tabState.length === 1){
                data = data.filter( (element) => element.state === req.query.state );
            }
            else {
                let tabfiltre = []
                tabState.forEach(el => {
                   data.filter( (element) => 
                        {
                            if (element.state === el){
                                tabfiltre.push(element)
                            }
                        })
                });
                data = tabfiltre
                
            }
        }
        if (req.query.sort){
            sort = req.query.sort
            data = data.sort((a, b) => (a[sort] > b[sort] ? 1 : -1))
        }
        let b = []
        let nb = 5
        let top = false
        let bottom = false
        req.query.page=Number(req.query.page)
        req.query.page = req.query.page * 5
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
        country: req.body.country
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
// exports.delete = (req, res) => {
//     const ad = Ad.findByIdAndDelete(req.params.id)
//     .then(() => {
//         User.find().then((data)=>{
//             console.log(data)
//             data.forEach((element)=>{
//                 element.favorite = element.favorite.filter(
//                     (el)=>
//                             el.ad._id.toString() !== req.params.id
//                   );
//                   User.findByIdAndUpdate(element._id.toString(), {
//                     favorite: element.favorite,
//                     //password: bcrypt.hashSync(req.body.password, saltRounds),
//                 }) .then(() => {
//                     res.send({
//                         delete: true
//                     })
//                 })
//                 .catch((err) => {
//                     res.status(500).send({
//                         message: err.message || "Some error occured"
//                     })
//                 })
//             })
//         })
       
//     })
//     .catch((err) => {
//         res.status(500).send({
//             message : err.message || "Some error occured"
//         })
//     })
    


// }

exports.delete = (req, res) => {
    const ad = Ad.findByIdAndDelete(req.params.id)
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
        // User.find().then((data)=>{
        //     console.log(data)
        //     data.forEach((element)=>{
        //         element.favorite = element.favorite.filter(
        //             (el)=>
        //                     el.ad._id.toString() !== req.params.id
        //           );
        //           User.findByIdAndUpdate(element._id.toString(), {
        //             favorite: element.favorite,
        //         }) .then(() => {
        //             const ad = Ad.findByIdAndDelete(req.params.id)
        //                 .then((data) => {
        //                     console.log(data, "data ok")
        //             res.send({
        //                 delete: true
        //             })
        //             .catch((err) => {
        //                 res.status(500).send({
        //                     message : err.message || "Some error occured"
        //                 })
        //             })
        //         })
        //         .catch((err) => {
        //             res.status(500).send({
        //                 message: err.message || "Some error occured"
        //             })
        //         })
        //     })
        // })
       
    // })
    
    


}



