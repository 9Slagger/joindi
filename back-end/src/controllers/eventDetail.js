const db = require("../models");
const _ = require("lodash");

module.exports = {
    eventDetail: async (req, res, next) => {
        try {
            let resultModel = await db.EventModel.findAll({ 
            })
            res.status(200).send(resultModel)
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}
