const Users = require('../models/user_schema');
const Products = require('../models/product_schema')
const firebase = require('../firebase');
const Orders = require('../models/order_schema');
const generatePayload = require("promptpay-qr");
const QRCode = require('qrcode'); 

const { mailer } = require('../services/utilities')

exports.checkout = async (req, res, next) => {
    let userProducts, total = 0;
    const useremail = req.useremail
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
        if(!data) return res.status(404).json({result: 'Not found', message: 'Product not found', data: data});
        
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
            req.products_data = productID

            req.qrPayment = qrUrl

            console.log("prod", req.products_data) //Send this
            next()
            // return res.status(200).json({result: 'OK', message: 'Success generate QR', data: qrUrl})
        })

    }
    catch (error) {
        res.status(500).json({result: 'Internal Server Error', message: '', error: error});
    }

};

exports.verifyPayment = async (req, res, next) => {
    
}

exports.checkoutComplete = async (req, res, next) => {
    const useremail = req.useremail
    const products_data= req.products_data //To this
    
    console.log(products_data)
    console.log(useremail)

    try {
        const orderStatus = req.body.status
        if (!orderStatus) return res.status(404).json({ result: 'Not found', message: 'required order status', data: {}})

        const user_data = await Users.findOne({'email': useremail})
        if(!user_data) return res.status(404).json({result: 'Not found', message: '', data: user_data});

        const products = products_data.map((item, index) => {
            return {_id: item}
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
        
        console.log("Order", order)
        const data = {orderID: order._id, firstname: order.user.firstname}
        req.data = data
        next()
    }
    catch (error) {
        res.status(500).json({result: 'Internal Server Error', message: '', error: error});
    }
}

exports.sendMail = async (req, res) => {
    const useremail = req.useremail
    const {orderID, firstname } = req.data

    console.log("Order ID:", String(orderID))

    mailer(useremail, `Order confirmation ${String(orderID)}`, 
    `<p>Dear ${firstname},</p>
    <br>
    <p>Thank you so much for order with Mongkol!</p>
    <br>
    <p>Your order is being prepared and packed with loving care. By the way, you have great taste.</p>
    <br>
    <p>Let us know if we can do anything to make your experience better!</p>
    <br>
    <p>Thanks again,</p>
    <p>Mongkol</p>
    `)

    firebase.firestore().collection("mail").doc(String(orderID)).set({
        to: useremail,
        message: {
            subject: `Order confirmation #${String(orderID)}`,
            html: `
            <p>Dear ${firstname},</p>
            <br>
            <p>Thank you so much for order with Mongkol!</p>
            <br>
            <p>Your order is being prepared and packed with loving care. By the way, you have great taste.</p>
            <br>
            <p>Let us know if we can do anything to make your experience better!</p>
            <br>
            <p>Thanks again,</p>
            <p>Mongkol</p>
            `
        },
        created_at: firebase.firestore.FieldValue.serverTimestamp()
    })
    res.status(200).json({result: 'OK', message: 'payment complete and also send email', data: {}});
}

// Dear sam,

// Thank you so much for order with Mongkol!

// Your order is being prepared and packed with loving care. By the way, you have great taste.

// Let us know if we can do anything to make your experience better!

// Thanks again,
// Mongkol