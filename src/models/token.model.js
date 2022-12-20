const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    token: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 86400,
    },
});

module.exports = mongoose.model('Token', tokenSchema);
