const { PORT } = require("./config.js");
const force = process.env.DATABASE_FORCE === "TRUE";
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const sequelize = require("./src/dbconfig");
const databaseLoader = require("./src/databaseLoader");

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
app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 }
  })
);
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/user", require("./src/routes/userRouter"));
app.use("/role", require("./src/routes/roleRouter"));
app.use("/customertype", require("./src/routes/customerRouter"));
app.use("/signin", require("./src/routes/authticationRouter"));

app.use("/event", require("./src/routes/eventRouter"))
app.use("/tag", require("./src/routes/tagRouter"))
app.use("/image", require("./src/routes/imageController"));
<<<<<<< HEAD
app.use("/approvepayment", require("./src/routes/approvePaymentRouter"));
app.use("/update-approvepayment", require("./src/routes/updateApprovePaymentRouter"));
app.use("/bookmark", require("./src/routes/bookmarkRouter"));
=======

app.use("/ticket", require("./src/routes/ticketRouter"))

>>>>>>> approve-payment
app.use((req, res, next) => {
  res.status(404).json({ messages: ["api not found"] });
});
(async () => {
  try {
<<<<<<< HEAD
    await sequelize.sync({ force, alter: force });
=======
    await sequelize.sync({ force: true ,alter: true });
>>>>>>> 7a8f7a769abf86ddd521a7d618e5bb5b4596e450
    await databaseLoader();
    app.listen(PORT, () => {
      console.log(`start server on port = ${PORT}`);
    });
  } catch (error) {
    console.log("can't start server");
    console.log(error);
  }
})();
