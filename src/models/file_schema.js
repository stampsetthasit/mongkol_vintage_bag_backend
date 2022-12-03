const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    file_name: String,
    filename_extension: String,
    file_path: String,
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('image', ImageSchema);