import Joi from "joi";

// Define Joi schema for createPost API
const createPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
});

// Define Joi schema for updatePost API
const updatePostSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  tags: Joi.array().items(Joi.string()),
});

export const blogValidation = {
  createPostSchema,
  updatePostSchema,
};
