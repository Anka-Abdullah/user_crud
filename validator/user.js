const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .trim()
    .required()
    .error(new Error("Please provide name fields")),

  address: Joi.string()
    .min(3)
    .trim()
    .required()
    .error(new Error("Please provide address fields")),

  email: Joi.string()
    .email()
    .required()
    .error(new Error("Please provide email  fields")),

  photos: Joi.string()
    .uri({
      scheme: ["http", "https"],
    })
    .required()
    .error(new Error("Please provide photo fields")),

  password: Joi.string()
    .min(8)
    .max(32)
    .trim()
    .required()
    .error(new Error("Please provide password fields")),

  creditcard_number: Joi.string()
    .trim()
    .pattern(/^\d+$/)
    .required()
    .error(new Error("Credit card data invalid.")),

  creditcard_name: Joi.string()
    .min(1)
    .max(100)
    .trim()
    .required()
    .error(new Error("Credit card data invalid.")),

  creditcard_type: Joi.string()
    .min(1)
    .max(100)
    .trim()
    .required()
    .error(new Error("Credit card data invalid.")),

  creditcard_expired: Joi.string()
    .min(5)
    .max(5)
    .trim()
    .required()
    .error(new Error("Credit card data invalid.")),

  creditcard_cvv: Joi.string()
    .trim()
    .min(3)
    .max(3)
    .pattern(/^\d+$/)
    .required()
    .error(new Error("Credit card data invalid.")),
});

const updatedSchema = Joi.object({
  user_id: Joi.string()
    .trim()
    .pattern(/^\d+$/)
    .required()
    .error(new Error("invalid field types.")),

  name: Joi.string()
    .min(3)
    .max(100)
    .trim()
    .error(new Error("invalid field types.")),

  address: Joi.string().min(3).trim().error(new Error("invalid field types.")),

  email: Joi.string().email().error(new Error("invalid field types.")),

  photos: Joi.string()
    .uri({
      scheme: ["http", "https"],
    })
    .error(new Error("invalid field types.")),

  password: Joi.string()
    .min(8)
    .max(32)
    .trim()
    .error(new Error("invalid field types.")),

  creditcard_number: Joi.string()
    .trim()
    .pattern(/^\d+$/)
    .error(new Error("invalid field types.")),

  creditcard_name: Joi.string()
    .min(1)
    .max(100)
    .trim()
    .error(new Error("invalid field types.")),

  creditcard_type: Joi.string()
    .min(1)
    .max(100)
    .trim()
    .error(new Error("invalid field types.")),

  creditcard_expired: Joi.string()
    .min(5)
    .max(5)
    .trim()
    .error(new Error("invalid field types.")),

  creditcard_cvv: Joi.string()
    .trim()
    .min(3)
    .max(3)
    .pattern(/^\d+$/)
    .error(new Error("invalid field types.")),
});
module.exports = { registerSchema, updatedSchema };
