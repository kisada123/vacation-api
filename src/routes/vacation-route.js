const express = require("express");

const authenticate = require("../middlewares/authenticate");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

const vacationController = require("../controllers/vacation-controller");

const router = express.Router();
//User
router.get("/vacation", authenticate, vacationController.getAllVacation);
router.patch("/vacation/:id", authenticate, vacationController.updateVacation);
router.delete("/vacation/:id", authenticate, vacationController.deleteVacation);

//Admin
router.get(
  "/vacationAdmin",
  authenticateAdmin,
  vacationController.getAllAdminVacation
);
router.get(
  "/vacationAdminAllName",
  authenticateAdmin,
  vacationController.getAllAdminVacationAllName
);
router.patch(
  "/vacation/approve/:id",
  authenticateAdmin,
  vacationController.approveVacation
);
router.patch(
  "/vacation/reject/:id",
  authenticateAdmin,
  vacationController.rejectVacation
);

module.exports = router;
