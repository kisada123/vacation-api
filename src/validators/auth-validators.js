const Joi = require("joi");

const validate = require("./validate");

const RegisterSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "any.required": "กรุณา ใส่ชื่อ",
    "string.empty": "กรุณา ใส่ชื่อ",
    "string.base ": "ชื่อต้องเป็น string",
  }),
  lastName: Joi.string().trim().required().messages({
    "any.required": "กรุณา ใส่นามสกุล",
    "string.empty": "กรุณา ใส่นามสกุล",
  }),
  username: Joi.string().trim().required().messages({
    "any.required": "กรุณา  ใส่ชื่อเล่น",
    "string.empty": "กรุณา ใส่ชื่อเล่น",
  }),
  email: Joi.string().email({ tlds: false }).trim().messages({
    "any.required": "กรุณา  ใส่อีเมล",
    "string.empty": "กรุณา ใส่อีเมล",
  }),
  password: Joi.string().alphanum().min(6).trim().required().messages({
    "any.required": "กรุณา  ใส่รหัสผ่าน",
    "string.empty": "กรุณา ใส่รหัสผ่าน",
    "string.min": "กรุณา ใส่รหัสผ่าน 6 ตัวอักษร",
    "string.alphanum": "กรุณา ใส่รหัสผ่านตัวเลข หรือ ตัวอักษร",
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .trim()
    .messages({
      "any.only": "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน",
      "string.empty": "กรุณา ใส่ยืนยันรหัสผ่าน",
    })
    .strip(),
});

exports.validateRegister = validate(RegisterSchema);

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).trim().messages({
    "any.required": "กรุณา  ใส่อีเมล",
    "string.empty": "กรุณา ใส่อีเมล",
  }),
  password: Joi.string().alphanum().min(6).trim().required().messages({
    "any.required": "กรุณา  ใส่รหัสผ่าน",
    "string.empty": "กรุณา ใส่รหัสผ่าน",
    "string.min": "กรุณา ใส่รหัสผ่าน 6 ตัวอักษร",
    "string.alphanum": "กรุณา ใส่รหัสผ่านตัวเลข หรือ ตัวอักษร",
  }),
});

exports.validateLogin = validate(loginSchema);
