const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ad = require('./ad.model');

const userSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        unique: true,
    },
    image: {
        type: String
    },
    isAdmin: {
        type: Boolean,
    },
    announcement:[
        {
            ad: {
                type: Schema.Types.ObjectId,
                ref: () => Ad
            }
        }
    ],
    favorite:[
        {
            ad: {
                type: Schema.Types.ObjectId,
                ref: Ad
            }
        }
    ]
});

module.exports = mongoose.model('User', userSchema);