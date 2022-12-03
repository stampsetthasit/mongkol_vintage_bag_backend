const Users = require('../models/user_schema');
const Products = require('../models/product_schema');
const { productValidation } = require('../services/validation');

exports.getAllProduct = async (req, res) => {

    const useremail = req.headers.email

    try {
        const user_data = await Users.findOne({ 'email': useremail })
        if(!user_data) return res.status(404).json({result: 'Not found', message: '', data: {}});

        const data = await Products.find()
        if(!data) return res.status(404).json({result: 'Not found', message: '', data: {}});
        const product_data = []

        for(let i = 0; i < data.length; i++) {
            const schema = {
                _id: data[i]._id,
                title: data[i].title,
                category: data[i].category,
                price: data[i].price,
                desc: data[i].desc,
                image: data[i].image,
            }
            product_data.push(schema)
        }

        res.status(200).json({result: 'OK', message: 'success get all product', data: product_data});
    }
    catch (error) {
        res.status(500).json({result: 'Internal Server Error', message: '', error: error});
    }
}

exports.addProduct = async (req, res) => {   //+ img
    const useremail = req.headers.email

    const { error } = productValidation(req.body);
    if (error) return res.status(200).json({result:'OK',masage:error.details[0].message, data:{}});
    
    try {
        const user_data = await Users.findOne({ 'email': useremail })
        if(!user_data) return res.status(404).json({result: 'Not found', message: '', data: {}});

        const data = await Products.create(req.body)
        

        res.status(200).json({result: 'OK', message: 'success create product', data: data});

    }catch (error){
        res.status(500).json({result: 'Internal Server Error', message: '', error: {}});
    }
}

exports.editProduct = async (req, res) => {
    const id = req.body.productID //undefined

    const { error } = productValidation(req.body);
    if (error) return res.status(200).json({result:'OK',masage:error.details[0].message, data: {}});

    try {
        const data = await Products.findById(id)
        if(!data) return res.status(404).json({result: 'Not found', message: '', data: data});

        const { title, category, price, desc, image} = req.body
        data.title = title
        data.category = category
        data.price = price
        data.desc = desc
        data.image = image
        data.modified = Date.now()
        await Products.findByIdAndUpdate(id, data)
        const schema = {
            title: data.title,
            category: data.category,
            price: data.price,
            desc: data.desc,
            image: data.image,
            modified: data.modified
        }
        return res.status(200).json({result: 'OK', message: 'success update address', data: schema});
    }
    catch (error) {
        res.status(500).json({result: 'Internal Server Error', message: '', error: error});
    }
}

exports.deleteProduct = async (req, res) => {
    const id = req.body.productID // .headers undefined
    
    try {
        const data = await Products.findById(id)
        if(!data) return res.status(404).json({result: 'Not found', message: '', data: data});

        await Products.findByIdAndDelete(id, data)
        const schema = {
            title: data.title,
            category: data.category,
            price: data.price,
            desc: data.desc,
            image: data.image,
        }

        return res.status(200).json({result: 'OK', message: 'success delete product', data: {id, schema}});
    }
    catch (error) {
        res.status(500).json({result: 'Internal Server Error', message: '', error: error});
    }
}