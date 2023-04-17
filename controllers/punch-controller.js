const axios = require('axios')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const dayjs = require('dayjs')

const { getUser } = require('../helpers/auth-helpers')
const thisYear = dayjs().format('YYYY')
const today = dayjs().format('YYYYMMDD')

const punchController = {
  getDashboard: async (req, res, next) => {
    try {
      const calendarDate = await axios.get(`https://cdn.jsdelivr.net/gh/ruyut/TaiwanCalendar/data/${thisYear}.json`)
      const checkHoliday = calendarDate.data.filter(d => d.date === today)[0].isHoliday
      const specificTime = '05:00:00';
      const todaySpecificTime = dayjs(`${dayjs().format('YYYY-MM-DD')} ${specificTime}`)
      const endTime = dayjs().isBefore(todaySpecificTime.format()) ? todaySpecificTime.format() : todaySpecificTime.add(1, 'days').format()
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