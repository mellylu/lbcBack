const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filterSchema = new Schema({
    category: {
        type: String,
    },
    univers: {
        type: Array,
    },
    size: {
        type: Array,
    },
    type:{
        type: Array,
    },
    brand: {
        type: Array,
    },
    material: {
        type: Array,
    },
    color: {
        type: Array,
    },
    state: {
        type: Array,
    },
});

module.exports = mongoose.model('Filter', filterSchema);