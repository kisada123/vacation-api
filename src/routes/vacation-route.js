const express = require("express");

const authenticate = require("../middlewares/authenticate");

const vacationController = require("../controllers/vacation-controller");

const router = express.Router();

router.get("/vacation", authenticate, vacationController.getAllVacation);
router.get(
  "/vacationAdmin",
  authenticate,
  vacationController.getAllAdminVacation
);
router.patch("/vacation/:id", vacationController.updateVacation);
router.delete("/vacation/:id", vacationController.deleteVacation);

router.patch("/vacation/approve/:id", vacationController.approveVacation);
router.patch("/vacation/reject/:id", vacationController.rejectVacation);

module.exports = router;
