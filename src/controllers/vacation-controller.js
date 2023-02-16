const { Vacation } = require("../models");

exports.getAllVacation = async (req, res, next) => {
  console.log("getAllVacation");
  try {
    const vacationList = await Vacation.findAll({
      where: { userId: req.user.id },
    });
    console.log(vacationList);
    res.status(200).json({ data: vacationList });
  } catch (err) {
    next(err);
  }
};
exports.getAllAdminVacation = async (req, res, next) => {
  console.log("getAllAdminVacation");
  try {
    const vacationList = await Vacation.findAll({});
    console.log(vacationList);
    res.status(200).json({ data: vacationList });
  } catch (err) {
    next(err);
  }
};

exports.updateVacation = async (req, res, next) => {
  try {
    const vacation = await Vacation.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({ data: vacation });
  } catch (err) {
    next(err);
  }
};
exports.deleteVacation = async (req, res, next) => {
  console.log("req.params", req.params);
  // console.log("req.user.id", req.user.id);

  try {
    const totalDelete = await Vacation.findOne(req.body, {
      where: { id: req.params.id },
    });

    // if (!totalDelete) {
    //   createError("this post was not found", 400);
    // }
    // if (totalDelete.userId !== req.params.id) {
    //   createError("you have no permission to delete this post", 403);
    // }
    await totalDelete.destroy();
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
exports.approveVacation = async (req, res, next) => {
  console.log("req.params", req.params);

  try {
    let approveVacation = await Vacation.findOne(req.body, {
      where: { id: req.params.id },
    });

    console.log("approveVacation", approveVacation.status);
    const updateData = {
      id: req.params.id,
      // typeOfLeave: approveVacation.typeOfLeave,
      // department: approveVacation.department,
      status: "ACCEPTED",
      createdAt: approveVacation.createdAt,
      updatedAt: approveVacation.updatedAt,
      // userId: approveVacation.userId,
    };
    console.log("updateData", updateData);

    await Vacation.update(updateData, {
      where: { id: req.params.id },
    });

    res.status(200).json();
  } catch (err) {
    next(err);
  }
};
exports.rejectVacation = async (req, res, next) => {
  console.log("req.params", req.params);

  try {
    let rejectVacation = await Vacation.findOne(req.body, {
      where: { id: req.params.id },
    });

    console.log("rejectVacation", rejectVacation.status);
    const updateData = {
      id: req.params.id,
      // typeOfLeave: rejectVacation.typeOfLeave,
      // department: rejectVacation.department,
      status: "REJECT",
      createdAt: rejectVacation.createdAt,
      updatedAt: rejectVacation.updatedAt,
      // userId: rejectVacation.userId,
    };
    // console.log("updateData", updateData);

    await Vacation.update(updateData, {
      where: { id: req.params.id },
    });

    res.status(200).json();
  } catch (err) {
    next(err);
  }
};
