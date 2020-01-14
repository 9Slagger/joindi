const _ = require("lodash")

module.exports = (data) => {
  return !(_.isInteger(data) || !_.isEmpty(data) || _.isBoolean(data))
}