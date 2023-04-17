const axios = require('axios')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const moment = require('moment')

const { getUser } = require('../helpers/auth-helpers')
const thisYear = moment().format('YYYY')
const today = moment().format('YYYYMMDD')

const punchController = {
  getDashboard: async (req, res, next) => {
    try {
      const calendarDate = await axios.get(`https://cdn.jsdelivr.net/gh/ruyut/TaiwanCalendar/data/${thisYear}.json`)
      const checkHoliday = calendarDate.data.filter(d => d.date === today)[0].isHoliday
      const endTime = moment().isBefore(moment('05:00', 'HH:mm').format()) ? moment('05:00', 'HH:mm').format() : moment('05:00', 'HH:mm').add(1, 'days').format()
      const punchOutTime = await prisma.punch.findFirst({
        where: {
          AND: {
            userId: {
              equals: getUser(req).id
            },
            createdAt: {
              lte: endTime
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
      res.render('dashboard', { checkHoliday, punchOutTime })
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = punchController