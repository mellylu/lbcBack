const nodemailer = require("nodemailer");
require('dotenv').config()

// async..await is not allowed in global scope, must use a wrapper
exports.sendEmail = async(req, res, numberrandom, destinataire) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: "thibault2399@hotmail.fr", // generated ethereal user
      pass: "535e8d854eaf", // generated ethereal password
    },
  });
  

  let infoMail = {
    from: "thibault2399@hotmail.fr", // sender address
    to: destinataire, // list of receivers
    subject: "Votre code de vérification leboncoin", // Subject line
    text: "Hello world?", // plain text body
    html: `<h1>Créer un compte</h1><Br /><p>Bonjour,</p><Br /><p>Vous avez initié une demande de création de compte leboncoin. Afin de confirmer votre identité, veuillez entrez le code suivant sur le boncoin : </p><Br/><h1>${numberrandom}</h1><p>Attention, ce code est valable 1h. Au délà, vous devrez recommencer la procédure de création de compte.</p><Br /><p><B>A tout de suite sur leboncoin</B></p>`
  };


  transporter.sendMail(infoMail, (err)=>{
    if(err){
      return console.log(err)
    }else{
      console.log(`Success`)
    }
})

transporter.close()
}
