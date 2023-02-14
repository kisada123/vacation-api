// const { sequelize } = require("./models");
// sequelize.sync({ force: true });
require("dotenv").config(); // import dotenv เข้ามา

const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const morgan = require("morgan");

const vacationRouter = require("./routes/vacation-route");
const authRoute = require("./routes/auth-route");
const notFoundMiddlewares = require("./middlewares/not-found");
const errorMiddlewares = require("./middlewares/error");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/", vacationRouter); // routes)

app.use(notFoundMiddlewares);
app.use(errorMiddlewares);

const port = process.env.PORT || 8000; // ใช้dotenv  PORT จะอยู่ในไฟล์ .env
app.listen(port, () =>
  console.log(chalk.blue.italic(`server running on port: ${port}`))
);
