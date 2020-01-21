const db = require("../models");
const _ = require("lodash");

module.exports = {
    getTag: async (req, res, next) => {
        try {
            let resultTag = await db.EventTagModel.findAll({ 
            })
            res.status(200).send(resultTag)
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
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
    }
}