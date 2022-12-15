const Users = require('../models/user_schema');
const Products = require('../models/product_schema');
const Files = require('../models/file_schema');
const { productValidation } = require('../services/validation');

exports.getAllProduct = async (req, res) => {

    const useremail = req.useremail

    try {
        const user_data = await Users.findOne({ 'email': useremail })
        if(!user_data) return res.status(404).json({result: 'Not found', message: '', data: {}});

        const data = await Products.find()
        if(!data) return res.status(404).json({result: 'Not found', message: '', data: {}});

        const product_data = []
        for(let i = 0; i < data.length; i++) { //loop product data from DB and append to array
            const images = await Files.findOne({file_name: data[i].image});
            const schema = {
                _id: data[i]._id,
                title: data[i].title,
                category: data[i].category,
                price: data[i].price,
                desc: data[i].desc,
                image: data[i].image = `public/images/${images.file_name}`,
            }
            product_data.push(schema)
        }

        res.status(200).json({result: 'OK', message: 'success get all product', data: product_data}); //send product to front
    }
    catch (error) {
        res.status(500).json({result: 'Internal Server Error', message: '', error: error});
    }
}

exports.addProduct = async (req, res) => {  
    const adminemail = req.adminemail //Only admin can add Product

    const { error } = productValidation(req.body); //Validation
    if (error) return res.status(200).json({result:'OK',masage:error.details[0].message, data:{}});
    
    try {
        const user_data = await Users.findOne({ 'email': adminemail })
        if(!user_data) return res.status(404).json({result: 'Not found', message: 'User not found', data: {}});

        const data = await Products.create(req.body)

        const images = await Files.findOne({file_name: data.image})
        data.image = `public/images/${images.file_name}`
        
        console.log(`Created new product by: ${user_data.email}, Product Name: ${req.body.title}, Time: ${Date.now()}`)

        res.status(200).json({result: 'OK', message: 'success create product', data: data});

    }catch (error){
        res.status(500).json({result: 'Internal Server Error', message: '', error: {}});
    }
}

exports.editProduct = async (req, res) => {
    const id = req.body.productID
    const adminemail = req.adminemail

    const { error } = productValidation(req.body); //Validation
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

        const images = await Files.findOne({file_name: data.image})//This 
        data.image = `public/images/${images.file_name}`

        await Products.findByIdAndUpdate(id, data) // find one and update find by ID
        const schema = {
            title: data.title,
            category: data.category,
            price: data.price,
            desc: data.desc,
            image: data.image,
            modified: data.modified
        }

        console.log(`Edited product by: ${data.email}, Product Name: ${title}, Time: ${Date.now()}`)

        return res.status(200).json({result: 'OK', message: 'success update address', data: schema});
    }
    catch (error) {
        res.status(500).json({result: 'Internal Server Error', message: '', error: error});
    }
}

exports.deleteProduct = async (req, res) => {
    const id = req.body.productID
    const adminemail = req.adminemail
    
    try {
        const data = await Products.findById(id) //find by ID and delete
        if(!data) return res.status(404).json({result: 'Not found', message: '', data: data});

        await Products.findByIdAndDelete(id, data)
        const schema = {
            title: data.title,
            category: data.category,
            price: data.price,
            desc: data.desc,
            image: data.image,
        }

        console.log(`Deleted product by: ${data.email}, Product Name: ${title}, Time: ${Date.now()}`)

        return res.status(200).json({result: 'OK', message: 'success delete product', data: {id, schema}});
    }
    catch (error) {
        res.status(500).json({result: 'Internal Server Error', message: '', error: error});
    }
}

