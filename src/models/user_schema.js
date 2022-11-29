const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: { type: String, unique: true},
    firstname: String,
    lastname: String,
    dob: Date,
    gender: String,
    point: {type: Number, default: 0},
    address: {
        address_line1: {type: String, default: ''},
        address_line2: {type: String, default: ''},
        city: {type: String, default: ''},
        province: {type: String, default: ''},
        zip: {type: String, default: ''},
        mobile: {type: String, default: ''}
    },
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
});

module.exports = mongoose.model('user', UserSchema);