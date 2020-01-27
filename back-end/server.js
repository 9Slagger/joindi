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

app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 }
  })
);
app.use(express.static(path.join(__dirname, "uploads")));
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

app.use("/user", require("./src/routes/userRouter"));
app.use("/role", require("./src/routes/roleRouter"));
app.use("/categorie", require("./src/routes/categoriesRouter"));
app.use("/customertype", require("./src/routes/customerRouter"));
app.use("/signin", require("./src/routes/authticationRouter"));

app.use("/event", require("./src/routes/eventRouter"));
app.use("/tag", require("./src/routes/tagRouter"));

app.use("/image", require("./src/routes/imageRouter"));

app.use("/ticket", require("./src/routes/ticketRouter"));

app.use("/bookmark", require("./src/routes/bookmarkRouter"));

// app.use("/event", require("./src/routes/eventRouter"));
app.use(
  "/eventhascategories",
  require("./src/routes/eventHasCategoriesRouter")
);
app.use("/tag", require("./src/routes/tagRouter"));
// app.use("/approvepayment", require("./src/routes/approvePaymentRouter"));
// app.use(
//   "/update-approvepayment",
//   require("./src/routes/updateApprovePaymentRouter")
// );

app.use("/bookmark", require("./src/routes/bookmarkRouter"));
// app.use("/ticket", require("./src/routes/ticketRouter"));
app.use(
  "/ticketInOrderStatus",
  require("./src/routes/ticketInOrderStatusRouter")
);
app.use("/ticketInOrder", require("./src/routes/ticketInOrderRouter"));
app.use(
  "/ticketInOrderHasImage",
  require("./src/routes/ticketInOrderHasImageRouter")
);
app.use((req, res, next) => {
  res.status(404).json({ messages: ["api not found"] });
});
(async () => {
  try {
    await sequelize.sync({ force: false, alter: false });
    await databaseLoader();
    app.listen(PORT, () => {
      console.log(`start server on port = ${PORT}`);
    });
  } catch (error) {
    console.log("can't start server");
    console.log(error);
  }
})();
