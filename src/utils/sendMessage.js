// const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;  
const client = require('twilio')(accountSid, authToken);
// const client = new twilio(accountSid, authToken);
exports.sendMessage = async(req, res, numberrandom, destinataire) => {
    console.log(numberrandom)
    console.log(destinataire)
    client.messages.create({
        body: 'Ahoy, friend!',
        from: '+630104226',
        to: '+630104226'
    })
    .then((message) => console.log(message.sid))
}