const db = require("../models");
const _ = require("lodash");

module.exports = {
updateApprovePayment: async (req, res, next) => {
        try {
            let resultModel = db.EventModel
            .update(
              {
                event_status_id: req.params.status,
                event_remark_reject: req.params.remark
              },
              { where: { id: req.params.id } }
            )
            res.status(200).send(resultModel)
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}
