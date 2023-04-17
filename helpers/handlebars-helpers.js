const dayjs = require('dayjs')

module.exports = {
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  },
  punchTimeCalcStatus: function (inTime, outTime) {
    const diff = dayjs(outTime).diff(dayjs(inTime), 'hour', true)
    return (diff > 8) ? "已成功打卡" : "缺勤"
  }
}