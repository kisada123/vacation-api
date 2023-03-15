const jwt = require("jsonwebtoken");
const createError = require("../utils/create-error");
const { Admin } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError("you are unauthorized1", 401);
    }
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const admin = await Admin.findOne({
      where: { id: payload.id, email: payload.email },
    });
    console.log("payload.id", payload.id);
    if (!admin) {
      createError("you are unauthorized2", 401);
    }
    req.admin = admin;
    next();
  } catch (err) {
    next(err);
  }
};
