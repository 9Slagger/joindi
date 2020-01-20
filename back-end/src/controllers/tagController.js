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
    }
}