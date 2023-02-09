module.exports = (req, res, next) => {
  //   throw new Error("TEST error middleware");
  res.status(404).json({ massage: "resource not found on this server" });
};
