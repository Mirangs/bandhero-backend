const Joi = require('@hapi/joi');

//Register validation
const registerValidation = data => {
  const schema = {
    login: Joi.string().min(5).required(),
    email: Joi.string().min(6).required().email(),
    pass: Joi.string().min(6).required(),
    phone: Joi.string().min(6).required()
  }

  return Joi.validate(data, schema);
}

module.exports = {
  registerValidation
}