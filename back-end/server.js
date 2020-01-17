const { PORT } = require("./config.js");
const force = process.env.DATABASE_FORCE === "TRUE";
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./src/dbconfig");
const databaseLoader = require('./src/databaseLoader')

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/user", require("./src/routes/userRouter"));
app.use("/role", require("./src/routes/roleRouter"));
app.use("/customertype", require("./src/routes/customerControllers"));
app.use("/signin", require("./src/routes/authticationRouter"));
app.use("/approvepayment", require("./src/routes/approvePaymentRouter"));
app.use((req, res, next) => {
  res.status(404).json({ messages: ["api not found"] });
});
(async () => {
  try {
    await sequelize.sync({ force });
    await databaseLoader()
    app.listen(PORT, () => {
      console.log(`start server on port = ${PORT}`);
    });
  } catch (error) {
    console.log("can't start server");
    console.log(error);
  }
})();
