const db = require("../models");
const _ = require("lodash");

const modelName = "ImageModel";
const arrayOfFields = ["file_size", "filename_extension"];

var fs = require("fs");

module.exports = {
  findAll: async (req, res, next) => {
    let resultInfo;
    try {
      resultInfo = await db[modelName].findAll();
      console.log(resultInfo);
      res.status(200).send(resultInfo);
    } catch (error) {
      console.log("findAll");
      console.error(error.message);
      res.status(400).send({ message: error.message });
    }
  },
  create: async (req, res, next) => {
    let resultInfo,
      obj = {};
    try {
      // req.body.originFileObj.mv(
      //   `uploads/payslip/${req.body["filename_extension"]}`
      // );
      console.log("files", req.files);

      let rand = parseInt(Math.random() * 1000000);

      req.files.image.mv(`uploads/payslips/${rand}_${req.files.image["name"]}`);

      // console.log(req.body);

      obj.file_size = req.files.image.size;
      obj.filename_extension = `${rand}_${req.files.image["name"]}`;

      // console.log(obj);

      //Upload image
      resultInfo = await db[modelName].create(obj);
      console.log(resultInfo);
      res.status(200).send(resultInfo);
    } catch (error) {
      console.error(error.message);
      res.status(400).send({ message: error.message });
    }
  },
  update: async (req, res, next) => {
    let resultInfo,
      obj = {};
    try {
      arrayOfFields.forEach(item => {
        obj[item] = req.body[item];
      });

      resultInfo = await db[modelName].update(obj, {
        where: { id: req.params.id }
      });
      console.log(resultInfo);
      res.status(200).send(`${modelName} id: ${req.params.id} updated.`);
    } catch (error) {
      console.error(error.message);
      res.status(400).send({ message: error.message });
    }
  },
  del: async (req, res, next) => {
    let resultInfo;
    try {
      resultInfo = await db[modelName].destroy({
        where: { id: req.params.id }
      });
      console.log(resultInfo);
      res.status(200).send(`${modelName} id: ${req.params.id} deleted.`);
    } catch (error) {
      console.error(error.message);
      res.status(400).send({ message: error.message });
    }
  }
};
