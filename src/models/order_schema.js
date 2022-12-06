const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    products: [{
        _id: String
    }],
    user: {
        email: {type: String, require: true},
        firstname: {type: String, require: true},
        lastname: {type: String, require: true},
        address: {
            address_line1: {type: String, require: true},
            address_line2: {type: String, require: true},
            city: {type: String, require: true},
            province: {type: String, require: true},
            zip: {type: String, require: true},
            mobile: {type: String, require: true}
        }
    },
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('order', OrderSchema);