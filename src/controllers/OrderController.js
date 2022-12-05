const Users = require('../models/user_schema');
const Products = require('../models/product_schema');
const Orders = require('../models/order_schema');
const generatePayload = require("promptpay-qr");
const QRCode = require('qrcode') 

exports.checkout = async (req, res, next) => {
    let userProducts, total = 0;
    const useremail = req.headers.email
    const productID = req.body.productID
    const priceTotal = req.body.priceTotal

    try {
        const user_data = await Users.findOneAndUpdate({'email': useremail})
        if(!user_data) return res.status(404).json({result: 'Not found', message: '', data: user_data});

        const address = await Users.findOne({'email': useremail})
        if(address.address.address_line1 === "") return res.status(404).json({result: 'Not found', message: 'address not found', data: address.address});
        if(address.address.city === "") return res.status(404).json({result: 'Not found', message: 'city not found', data: address.address});
        if(address.address.province === "") return res.status(404).json({result: 'Not found', message: 'province not found', data: address.address});
        if(address.address.zip === "") return res.status(404).json({result: 'Not found', message: 'zip not found', data: address.address});
        if(address.address.mobile === "") return res.status(404).json({result: 'Not found', message: 'mobile not found', data: address.address});

        const data = await Products.findById(productID)
        if(!data) return res.status(404).json({result: 'Not found', message: '', data: data});
        
        const amount = parseFloat(priceTotal)
        const payload = generatePayload('0983187837', {amount});
        const option = {
            color: {
                dark: '#000',
                light: '#fff'
            }
        }
        QRCode.toDataURL(payload, option, (error, qrUrl) => {
            if (error) return res.status(400).json({result: 'Bad Request', message: 'QR generate failed', data: error})
            next()
            return res.status(200).set({'status': 'success', 'productID': productID, 'email': useremail}).json({result: 'OK', message: 'Success generate QR', data: qrUrl})
        })

    }
    catch (error) {
        res.status(500).json({result: 'Internal Server Error', message: '', error: error});
    }

};

exports.checkoutComplete = async (req, res, next) => {
    const useremail = req.headers.email
    const productID = req.body.productID
    
    try {
        const orderStatus = req.body.status
        if (!orderStatus) return res.status(404).json({ result: 'Not found', message: 'required order status', data: {}})

        const user_data = await Users.findOne({'email': useremail})
        if(!user_data) return res.status(404).json({result: 'Not found', message: '', data: user_data});

        const products = productID.map(item => {
            return {product: {...item.productID}}
        })
        
        const order = await Orders.create({
            user: {
                email: user_data.email,
                firstname: user_data.firstname,
                lastname: user_data.lastname,
                address: user_data.address
            },
            products: products
        });

        order.save();

        next()
        res.status(200).json({result: 'OK', message: '', data: order.user});
    }
    catch (error) {
        res.status(500).json({result: 'Internal Server Error', message: '', error: error});
    }
}