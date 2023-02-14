const express = require("express");

const authController = require("../controllers/auth-controller");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/loginAdmin", authController.loginAdmin);
router.post("/vacation", authenticate, authController.vacation);
router.get("/me", authenticate, authController.getMe);

module.exports = router;
