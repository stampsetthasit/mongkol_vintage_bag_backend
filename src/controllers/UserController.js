const Users = require('../models/user_schema');
const Products = require('../models/product_schema');
const firebase = require('../firebase');
const { addressValidation, wishlistValidation } = require('../services/validation');
const { pointCal, couponDis, mailer } = require('../services/utilities')

exports.updateAddress = async (req, res) => {
    const { error } = addressValidation(req.body);
    if (error) return res.status(200).json({result: 'OK', message: error.details[0].message, data: {}});

    const useremail = req.useremail

    try {
        const data = await Users.findOne({ 'email': useremail })
        if(!data) return res.status(404).json({result: 'Not found', message: '', data: data});

        const { address_line1, address_line2, city, province, zip, mobile} = req.body
        data.address.address_line1 = address_line1
        data.address.address_line2 = address_line2
        data.address.city = city
        data.address.province = province
        data.address.zip = zip
        data.address.mobile = mobile
        data.modified = Date.now()

        await Users.findOneAndUpdate(useremail, data)
        const schema = {
            email: data.email,
            address: data.address,
            modified: data.modified
        }
        return res.status(200).json({result: 'OK', message: 'Success update address', data: schema});
    }
    catch (error) {
        res.status(500).json({result: 'Internal Server Error', message: '', error: error});
    }
}

exports.updatePoint = async (req, res) => {

    const useremail = req.useremail
    const priceTotal = req.body.priceTotal
    const point = pointCal(priceTotal)

    try {
        const data = await Users.findOne({ 'email': useremail })
        if(!data) return res.status(404).json({result: 'Not found', message: '', data: data});


        data.point += Number(point)
        data.modified = Date.now()

        await Users.findOneAndUpdate(useremail, data)
        const schema = {
            email: data.email,
            point: data.point,
            modified: data.modified
        }
        return res.status(200).json({result: 'OK', message: 'success update point', data: schema});
    }
    catch (error) {
        res.status(500).json({result: 'Internal Server Error', message: '', error: error});
    }

}

exports.addWishlistItem = async (req, res) => {

    const useremail = req.useremail
    const productID = req.body.productID

    const { error } = wishlistValidation(req.body);
    if (error) return res.status(200).json({result:'OK',masage:error.details[0].message, data: {}});

    try {
        const user_data = await Users.findOneAndUpdate({'email': useremail})
        if(!user_data) return res.status(404).json({result: 'Not found', message: '', data: user_data});

        const data = await Products.findById(productID)
        if(!data) return res.status(404).json({result: 'Not found', message: '', data: data});

        const updateWishlistItems = user_data.wishlist.items ? [...user_data.wishlist.items] : [];
        updateWishlistItems.push({
            _id: productID,
            modified: Date.now()
        });

        const updatedWishlist = { items: updateWishlistItems };
        user_data.wishlist = updatedWishlist;
        user_data.save();

        return res.status(200).json({result: 'OK', message: 'success add wishlist', data: updateWishlistItems});

    }
    catch (error) {
        res.status(500).json({result: 'Internal Server Error', message: '', error: error});
    }
}

exports.deleteWishlistItem = async (req, res) => {
    const useremail = req.useremail
    const productID = req.body.productID

    const { error } = wishlistValidation(req.body);
    if (error) return res.status(200).json({result:'OK',masage:error.details[0].message, data: {}});

    try {
        const user_data = await Users.findOneAndUpdate({'email': useremail})
        if(!user_data) return res.status(404).json({result: 'Not found', message: '', data: user_data});

        const data = await Products.findById(productID)
        if(!data) return res.status(404).json({result: 'Not found', message: '', data: data});

        const updateWishlistItems = user_data.wishlist.items.filter(item => item._id.toString() != productID.toString());

        user_data.wishlist.items = updateWishlistItems;

        user_data.save();

        return res.status(200).json({result: 'OK', message: 'success remove wishlist', data: updateWishlistItems});

    }
    catch (error) {
        res.status(500).json({result: 'Internal Server Error', message: '', error: error});
    }

}

exports.coupon = async (req, res) => {
    const useremail = req.useremail
    const priceTotal = req.body.priceTotal
    const selected = req.body.coupon

    const data = await Users.findOne({ 'email': useremail })
    if(!data) return res.status(404).json({result: 'Not found', message: '', data: data});

    const point = data.point

    const discount = couponDis(point, priceTotal, selected)

    try {

        data.point = discount.point
        data.modified = Date.now()

        await Users.findOneAndUpdate(useremail, data)
        const schema = {
            email: data.email,
            point: data.point,
            modified: data.modified,
            newPriceTotal: discount.total
        }
        return res.status(200).json({result: 'OK', message: 'success redeem coupon', data: schema});
    }
    catch (error) {
        res.status(500).json({result: 'Internal Server Error', message: '', error: error});
    }
}

exports.contactus = async (req, res) => {
    const userEmail = req.body.email
    const userName = req.body.name
    const userMsg = req.body.msg

    try {

        mailer('mongkolteam.info@gmail.com', `Contact us from ${userEmail}`, `<h5>Name: ${userName} <br> Email: ${userEmail} <br></h5><p>Message: ${userMsg}</p>`);

        firebase.firestore().collection("contact-us").add({
            name: userName,
            email: userEmail,
            message: userMsg,
            created_at: firebase.firestore.FieldValue.serverTimestamp()
        })
        res.status(200).json({result: 'OK', message: 'Success send contact us', data: {}});
    }
    catch (error) {
        res.status(500).json({result: 'Internal Server Error', message: '', error: error});
    }

}
