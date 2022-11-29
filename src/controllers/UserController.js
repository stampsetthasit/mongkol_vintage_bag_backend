const Users = require('../models/user_schema');
const { addressValidation } = require('../services/validation');

exports.updateAddress = async (req, res) => {
    const { error } = addressValidation(req.body);
    if (error) return res.status(200).json({result: 'OK', message: error.details[0].message, data: {}});

    const useremail = req.headers.email

    try {
        const data = await Users.findOne({ 'email': useremail })
        if(!data) return res.status(404).json({result: 'Not found', message: '', data: {data}});

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
        return res.status(200).json({result: 'OK', message: 'success update address', data: {data: schema}});
    }
    catch (error) {
        res.status(500).json({result: 'Internal Server Error', message: '', error: {error}});
    }
}

// point update point