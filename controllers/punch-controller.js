const axios = require('axios')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const thisYear = new Date().getYear() + 1900
const today = new Date().toISOString().split('T')[0].replaceAll('-', '')

const punchController = {
  getDashboard: async (req, res) => {
    try {
      const calendarDate = await axios.get(`https://cdn.jsdelivr.net/gh/ruyut/TaiwanCalendar/data/${thisYear}.json`)
      const checkHoliday = calendarDate.data.filter(d => d.date === today)[0].isHoliday
      // const userPunchRecord = await prisma.punch.findUnique({
      // })
      res.render('dashboard', {checkHoliday})
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = punchController