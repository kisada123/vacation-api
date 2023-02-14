const {
  validateRegister,
  validateLogin,
  validateAdminRegister,
  validateVacation,
} = require("../validators/auth-validators");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User, Admin, Vacation } = require("../models");
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

// exports.admin = async (req, res, next) => {
//   try {
//     const value = validateAdminRegister(req.body);

//     const admin = await Admin.findOne({
//       where: {
//         [Op.or]: [{ email: value.email || "" }],
//       },
//     });
//     if (admin) {
//       createError("อีเมลถูกใช้งานแล้ว", 400);
//     }

//     value.password = await bcrypt.hash(value.password, 12); //12คือหน่วงเวลาในการhash
//     await Admin.create(value);
//     // console.log(user);

//     res
//       .status(201)
//       .json({ message: "สมัครสำเร็จ โปรดเข้าสู่ระบบเพื่อจะดำเนินการต่อ" });
//   } catch (err) {
//     next(err);
//   }
// };

//++++++++++++++++++++++++++++

//++++++++++++++++++++++++vacation
exports.vacation = async (req, res, next) => {
  // console.log(req.user.id);
  try {
    const value = validateVacation({
      ...req.body,
      userId: req.user.id.toString(),
    });
    console.log(value);
    // const vacation = await Vacation.findOne({});

    await Vacation.create(value);

    res.status(201).json({ message: "บันทึกข้อมูลสำเร็จ" });
  } catch (err) {
    next(err);
  }
};
//+++++++++++++++++++++++++++

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);
    // ++++
    const vacation = await Vacation.findOne({});
    // ++++
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

    const accessToken = jwt.sign(
      {
        // ส่งข้อมูลuserไปให้ พร้อมpayload
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    ); // ค่าidมาจากobject  user = await User.findOne แล้ว.idเข้าไป
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.loginAdmin = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);

    const admin = await Admin.findOne({
      where: {
        [Op.or]: [{ email: value.email || "" }],
      },
    });
    if (!admin) {
      createError("อีเมลหรือรหัสผ่านไม่ถูกต้อง", 400);
    }

    const isCorrect = await bcrypt.compare(value.password, admin.password);
    if (!isCorrect) {
      createError("อีเมลหรือรหัสผ่านไม่ถูกต้อง", 400);
    }

    const accessToken = jwt.sign(
      {
        // ส่งข้อมูลuserไปให้ พร้อมpayload
        id: admin.id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        username: admin.username,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    ); // ค่าidมาจากobject  user = await User.findOne แล้ว.idเข้าไป
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
