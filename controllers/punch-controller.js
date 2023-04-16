const axios = require('axios')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const { getUser } = require('../helpers/auth-helpers')
const thisYear = new Date().getYear() + 1900
const today = new Date().toISOString().split('T')[0].replaceAll('-', '')

const punchController = {
  getDashboard: async (req, res, next) => {
    try {
      const calendarDate = await axios.get(`https://cdn.jsdelivr.net/gh/ruyut/TaiwanCalendar/data/${thisYear}.json`)
      const checkHoliday = calendarDate.data.filter(d => d.date === today)[0].isHoliday
      const todayDate = new Date().setHours(0, 0, 0, 0)
      const offset = new Date().getTimezoneOffset()
      const punchDate = await prisma.punch.findFirst({
        where: {
          AND: {
            userId: {
              equals: getUser(req).id
            },
            createdAt: {
              lte: new Date(todayDate - offset * 60000 + 21 * 60 * 60000)
            },
            type: {
              equals: 'out'
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      res.render('dashboard', { checkHoliday, punchDate })
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = punchController