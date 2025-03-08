import Joi from "joi";

export const userLoginSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(3).required(),
  }),
};
