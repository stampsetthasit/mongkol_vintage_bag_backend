const Joi = require("@hapi/joi");
const { join } = require("path");

const registerValidation = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().max(128).required(),
    lastname: Joi.string().max(128).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(32).required(),
    cfpassword: Joi.any().valid(Joi.ref('password')).required().options({ messages: { 'any.only': '{{#label}} does not match'} }),
    gender: Joi.string().min(3).max(10).required(),
    dob: Joi.date().required()
  });
  return schema.validate(data);
};

const changePwdValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(32).required(),
    cfpassword: Joi.any().valid(Joi.ref('password')).required().options({ messages: { 'any.only': '{{#label}} does not match'} })
  });
  return schema.validate(data);
}

const addressValidation = (data) => {
  const schema = Joi.object({
    address_line1: Joi.string().max(128).required(),
    address_line2: Joi.string().max(128).required(),
    city: Joi.string().max(26).required(),
    province: Joi.string().max(26).required(),
    zip: Joi.string().length(5).required(),
    mobile: Joi.string().length(10).required()
  });
  return schema.validate(data);
};

const contactUsValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    msg: Joi.string().min(10).required
  })
}

const productValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string(),
    productID: Joi.string(),
    title: Joi.string().max(60).required(),
    category: Joi.string().max(60).required(),
    price: Joi.number().max(9999999).required(),
    desc: Joi.string().max(300).required(),
    image: Joi.string().required(),
  });
  return schema.validate(data);
};

const wishlistValidation = (data) => {
  const schema = Joi.object({
    productID: Joi.string()
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.addressValidation = addressValidation;
module.exports.productValidation = productValidation;
module.exports.changePwdValidation = changePwdValidation;
module.exports.wishlistValidation = wishlistValidation;
module.exports.contactUsValidation = contactUsValidation;
