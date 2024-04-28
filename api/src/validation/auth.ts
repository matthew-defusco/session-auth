import Joi from "@hapi/joi";
import { BCRYPT_MAXIMUM_BYTES } from "../config";

const email = Joi.string()
  .email()
  .min(8)
  .max(254)
  .lowercase()
  .trim()
  .required();
const name = Joi.string().min(3).max(128).trim().required();
const password = Joi.string()
  .min(8)
  .max(BCRYPT_MAXIMUM_BYTES, "utf8")
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
  .message("{#label} must contain one uppercase, one lowercase, and one digit")
  .required();
const passwordConfirmation = Joi.valid(Joi.ref("password")).required();

export const registerSchema = Joi.object({
  email,
  name,
  password,
  passwordConfirmation,
});

export const loginSchema = Joi.object({
  email,
  password,
});
