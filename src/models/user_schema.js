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


UserSchema.methods.addWishlist = function(product) {
  const wishlistIndex = this.wishlist.items.findIndex(item => {
    return item.productId.toString() == product._id.toString();
  });

  const currentDate = Date.now();
  const updatedWishlistItems = this.wishlist ? [...this.wishlist.items] : [];

    updatedWishlistItems.push({
      productId: product._id,
      mo: currentDate
    });

  const updatedWishlist = { items: updatedWishlistItems };
  this.wishlist = updatedWishlist;

  return this.save();
};

UserSchema.methods.removeFromwishlist = function(productId) {
  const updatedWishlistItems = this.wishlist.items.filter(
    item => item.productId.toString() != productId.toString()
  );

  this.wishlist.items = updatedWishlistItems;

  return this.save();
};

UserSchema.methods.clearwishlist = function() {
  this.wishlist = { items: [] };
  return this.save();
};

module.exports = mongoose.model('user', UserSchema);