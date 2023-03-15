const express = require("express");

const authController = require("../controllers/auth-controller");
const authenticate = require("../middlewares/authenticate");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

const router = express.Router();
//User
router.post("/register", authenticate, authController.register);
router.post("/login", authController.login);
router.post("/loginAdmin", authController.loginAdmin);
router.post("/vacation", authenticate, authController.vacation);
router.get("/me", authenticate, authController.getMe);

//Admin
router.get("/me-admin/:id", authenticateAdmin, authController.getMeAdmin);

module.exports = router;
