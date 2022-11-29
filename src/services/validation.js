const Joi = require("@hapi/joi");
const { join } = require("path");

const registerValidation = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().max(128).required(),
    lastname: Joi.string().max(128).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(32).required(),
    gender: Joi.string().min(3).max(10).required(),
    dob: Joi.date().required()
  });
  return schema.validate(data);
};

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

// const productValidation = (data) => {
//   const schema = Joi.object({
//     title: Joi.string().max(60).required(),
//     category: Joi.string().max(60).required(),
//     price: Joi.number().max(9999999).required(),
//     desc: Joi.string().max(300).required(),
//     image: Joi.string().required(),
//   });
//   return schema.validate(data);
// };
const productValidation = (data) => {
  const schema = Joi.object({
    productID: Joi.string(),
    title: Joi.string().max(60).required(),
    category: Joi.string().max(60).required(),
    price: Joi.number().max(9999999).required(),
    desc: Joi.string().max(300).required(),
    image: Joi.string().required(),
  });
  return schema.validate(data);
};


// const loginValidation = (data) => {
//   const schema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(6).required(),
//   });
//   return schema.validate(data);
// };

// const forgetPassValidation = (data) => {
//   const schema = Joi.object({
//     email: Joi.string().min(6).required()
//   });
//   return schema.validate(data);
// };

// const transactionValidation = (data) => {
//   const schema = Joi.object({
//     title: Joi.string().required(),
//     detail: Joi.string().required(),
//     type: Joi.string().required(),
//     reward: Joi.string().allow("").required(),
//     petitioner_id: Joi.string().required(),
//     applicant_id: Joi.string().allow("").required(),
//     conversation_id: Joi.string().allow("").required(),
//     location: {
//       room: Joi.string().required(),
//       floor: Joi.string().required(),
//       building: Joi.string().required(),
//       optional: Joi.string().allow("").required(),
//       latitude: Joi.number().required(),
//       longitude: Joi.number().required(),
//     },
//     task_location: {
//       name: Joi.string().required(),
//       building: Joi.string().required(),
//       latitude: Joi.number().required(),
//       longitude: Joi.number().required(),
//     },
//   });
//   return schema.validate(data);
// };

// const transactionStateChangeValidation = (data) => {
//   const schema = Joi.object({
//     transaction_id: Joi.string().required(),
//   });
//   return schema.validate(data);
// };

// const transactionReportValidation = (data) => {
//   const schema = Joi.object({
//     transaction_id: Joi.string().required(),
//     detail: Joi.string().required(),
//   });
//   return schema.validate(data);
// };

// const appReportValidation = (data) => {
//   const schema = Joi.object({
//     email: Joi.string().required(),
//     detail: Joi.string().required(),
//   });
//   return schema.validate(data);
// };

module.exports.registerValidation = registerValidation;
module.exports.addressValidation = addressValidation;
module.exports.productValidation = productValidation;
// module.exports.loginValidation = loginValidation;
// module.exports.forgetPassValidation = forgetPassValidation;
// module.exports.verifyValidation = verifyValidation;
// module.exports.transactionValidation = transactionValidation;
// module.exports.transactionStateChangeValidation =
//   transactionStateChangeValidation;
// module.exports.transactionReportValidation = transactionReportValidation;
// module.exports.appReportValidation = appReportValidation;
