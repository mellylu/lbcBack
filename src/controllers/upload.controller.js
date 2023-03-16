const cloudinary = require('cloudinary').v2;

// Configuration 
const options = cloudinary.config({
    cloud_name: "melly-lucas",
    api_key: "647417452658933",
    api_secret: "gsgUPDpXcAfS4oNKH_Pgo3jXc7I"
  });


exports.uploadFile = (req, res) => {
    console.log(req.file.buffer)
    console.log(JSON.stringify(req.file.buffer))
    if (req.file) {
        cloudinary.uploader.upload_stream({ resource_type: "image" }, options).end(req.file.buffer)
        .then((data) => {
            console.log(data)
        })
        .catch(err => console.log(err))
    }
  
    res.status(200).json("fini")
}