import Joi from "joi";

// Joi schema for user registration
const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  phone_no: Joi.string().required(),
  role: Joi.string().valid("user", "admin"),
  password: Joi.string().required(),
});

// Joi schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const authValidation = {
  registerSchema,
  loginSchema,
};
