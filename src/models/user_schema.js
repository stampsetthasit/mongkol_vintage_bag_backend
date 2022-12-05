const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: { type: String, unique: true},
    firstname: String,
    lastname: String,
    dob: Date,
    gender: String,
    point: {type: Number, default: 0.00},
    address: {
        address_line1: {type: String, default: ''},
        address_line2: {type: String, default: ''},
        city: {type: String, default: ''},
        province: {type: String, default: ''},
        zip: {type: String, default: ''},
        mobile: {type: String, default: ''}
    },
    roles: {type: String, default: "user"},
    wishlist: {
        items: [
            {
                id: {type: mongoose.Schema.Types.ObjectId, require: true},
                modified: {type: Date, default: Date.now}
            }
        ]
    },
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now}
});

module.exports = mongoose.model('user', UserSchema);