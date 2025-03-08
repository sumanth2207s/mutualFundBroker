import Joi from "joi";

export const userRegisterSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,30}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least one letter, one number, and one special character (@$!%*?&).",
      }),
  }),
};
