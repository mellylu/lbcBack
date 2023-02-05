const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toolsAdSchema = new Schema({
    category: {
        type: Array,
    },
    univers: {
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

module.exports = mongoose.model('ToolsAd', toolsAdSchema);