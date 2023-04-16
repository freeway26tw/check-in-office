const moment = require('moment')

module.exports = {
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  },
  punchTimeCalc: function (inTime, outTime) {
    const diff = moment.utc(moment(outTime, "DD/MM/YYYY HH:mm:ss").diff(moment(inTime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
    return diff
  }
}