const db = require("../models");

module.exports = {
  createImage: async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        messages: { title_en: "no files were uploaded", title_th: "" }
      });
    }
    if (!req.files.image) {
      return res.status(400).json({
        messages: { title_en: "only allow field image", title_th: "" }
      });
    }
    if (req.files.image.mimetype.split("/")[0] !== "image") {
      return res.status(400).json({
        messages: { title_en: "only allow image", title_th: "" }
      });
    }
    let imageResult, transaction;
    try {
      transaction = await db.sequelize.transaction();
    } catch (error) {
      return res.status(400).json({
        messages: { title_en: "someting is wrong", title_th: "" }
      });
    }
    try {
      const arrayFilename = req.files.image.name.split(".");
      const filenameExtension = arrayFilename[arrayFilename.length - 1];
      imageResult = await db.ImageModel.create(
        {
          file_size: req.files.image.size,
          filename_extension: filenameExtension
        },
        { transaction }
      );
    } catch (error) {
      console.log("🔴", error);
      return res.status(400).json({
        messages: { title_en: "someting is wrong", title_th: "" }
      });
    }
    req.files.image.mv(
      `uploads/${imageResult.id}.${imageResult.filename_extension}`,
      async error => {
        if (error) {
          console.log("🔴", error);
          try {
            await transaction.rollback();
          } catch (error) {
            console.log("🔴", error);
          }
          return res.status(400).send({
            messages: { title_en: "someting is wrong", title_th: "" }
          });
        }
        try {
          await transaction.commit();
          res
            .status(201)
            .json({ messages: { title_en: "file uploaded", title_th: "" } });
        } catch (error) {
          res.status(400).send({
            messages: { title_en: "someting is wrong", title_th: "" }
          });
        }
      }
    );
  }
};
