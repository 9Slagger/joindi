const db = require("../models");
const _ = require("lodash");

module.exports = {
  getTag: async (req, res, next) => {
    try {
      const resultTag = await db.EventTagModel.findAll({});
      res.status(200).json({
        result: resultTag,
        messages: {
          title_en: "get tags success",
          title_th: ""
        }
<<<<<<< HEAD
      });
    } catch (error) {
      res.status(400).json({
        messages: {
          title_en: "get tags fail",
          title_th: ""
        }
      });
=======
    },

    toggleActiveTag: async (req, res, next) => {
        try {
            let toggleActiveTag = await db.EventTagModel.findOne({ 
                where: { id: req.body.id}
            });
            if (!toggleActiveTag){
                res.status(400).send({ message: "Tag not found"})
            }else {
                toggleActiveTag.update({ 
                    tag_active: req.body.tagActive //หน้าบ้านต้องส่งสถานะมาว่าเป็นtrueหรือfalse
                 })
                 res.status(200).json({ message: "success" });
            }
        } catch (error) {
            res.status(400).send({ message: error.message})
        }
>>>>>>> 7a8f7a769abf86ddd521a7d618e5bb5b4596e450
    }
  }
};
