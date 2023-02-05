const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    univers: {
        type: String,
    },
    type:{
        type: String,
    },
    brand: {
        type: String,
    },
    material: {
        type: String,
    },
    color: {
        type: String,
    },
    state: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    }
});

module.exports = mongoose.model('Ad', adSchema);