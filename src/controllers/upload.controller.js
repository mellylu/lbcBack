const streamifier = require('streamifier'); 
const cloudinary = require('cloudinary').v2;

// Configuration 
const options = cloudinary.config({
    cloud_name: "melly-lucas",
    api_key: "647417452658933",
    api_secret: "gsgUPDpXcAfS4oNKH_Pgo3jXc7I"
  });


exports.uploadFile = (req, res) => {
    
    if (req.file) { 
        let cld_upload_stream = cloudinary.uploader.upload_stream( 
            { 
            folder : req.params.folder
            }, 
            function(error, result) { 
                if (error){
                    res.status(500).json(error)
                }
                if (result){
                    res.status(200).json(result)
                }
            } 
        ); 
        streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream)  
    }
    else{
        res.status(500).json({message : "Vous devez choisir une image"})
    }
    
}

exports.uploadPhotoUser = (req, res) => {
    if (req.file) { 
        let cld_upload_stream = cloudinary.uploader.upload_stream( 
            { 
            folder : "users" 
            }, 
            function(error, result) { 
                if (error){
                    res.status(500).json(error)
                }
                if (result){
                    res.status(200).json(result)
                }
            } 
        ); 
        streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream)  
    }
    else{
        res.status(500).json({message : "Vous devez choisir une image"})
    }
    
}

exports.deleteFile = (req, res) => {
    cloudinary.api.delete_resources(`annonces/${req.params.id}`, function(error, result) {
        if (result){
            if (result.deleted[`annonces/${req.params.id}`] === "deleted")
            {
                res.status(200).json({message : 'delete ok'})
            }
            else{
                res.status(500).json({error : 'error delete'})
            }
        }
        else{
            res.status(500).json({error : 'error'})
        }
    }); 
}

exports.deletePhotoUser = (req, res) => {
    cloudinary.api.delete_resources(`users/${req.params.id}`, function(error, result) {
        if (result){
            if (result.deleted[`users/${req.params.id}`] === "deleted")
            {
                res.status(200).json({message : 'delete ok'})
            }
            else{
                res.status(500).json({error : 'error delete'})
            }
        }
        else{
            res.status(500).json({error : 'error'})
        }
    }); 
}