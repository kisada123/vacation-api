const {
  validateRegister,
  validateLogin,
} = require("../validators/auth-validators");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: value.email || "" }],
      },
    });
    if (user) {
      createError("อีเมลถูกใช้งานแล้ว", 400);
    }

    value.password = await bcrypt.hash(value.password, 12); //12คือหน่วงเวลาในการhash
    await User.create(value);
    // console.log(user);

    res
      .status(201)
      .json({ message: "สมัครสำเร็จ โปรดเข้าสู่ระบบเพื่อจะดำเนินการต่อ" });
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: value.email || "" }],
      },
    });
    if (!user) {
      createError("อีเมลหรือรหัสผ่านไม่ถูกต้อง", 400);
    }

    const isCorrect = await bcrypt.compare(value.password, user.password);
    if (!isCorrect) {
      createError("อีเมลหรือรหัสผ่านไม่ถูกต้อง", 400);
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }); // ค่าidมาจากobject  user = await User.findOne แล้ว.idเข้าไป
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};