const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    title: String,
    category: String,
    price: Number,
    desc: String,
    image: {
        type: String,
        required: true
    },
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
})

module.exports = mongoose.model('product', ProductSchema);