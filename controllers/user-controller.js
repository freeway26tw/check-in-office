const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()
const axios = require('axios')
const { getUser } = require('../helpers/auth-helpers')
const { get } = require('../routes')
const dayjs = require('dayjs')

const userController = {
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: async (req, res, next) => {
    res.redirect('/dashboard')
  },
  logout: async (req, res) => {
    await req.logout(function (err) {
      if (err) { return next(err); }
      req.flash('success_messages', '登出成功!')
      res.redirect('/signin')
    })
  },
  profile: async (req, res, next) => {
    res.render('users/profile', { user: getUser(req) })
  },
  putUser: async (req, res, next) => {
    const { employeeCode, password, confirmPassword } = req.body
    try {
      if (!password) throw new Error('需填寫密碼')
      if (password !== confirmPassword) throw new Error('密碼不相符')
      await prisma.user.update({
        where: {
          id: getUser(req).id
        },
        data: {
          password: bcrypt.hashSync(password, 10)
        }
      })
      req.flash('success_messages', '使用者資料編輯成功')
      res.redirect('/dashboard')
    }
    catch (err) {
      next(err)
    }
  },
  punch: async (req, res, next) => {
    const { punchType } = req.body
    const thisYear = dayjs().format('YYYY')
    const specificTime = '05:00:00';
    const todaySpecificTime = dayjs(`${dayjs().format('YYYY-MM-DD')} ${specificTime}`)
    const today = dayjs().isAfter(todaySpecificTime) ? dayjs().format('YYYYMMDD') : dayjs().subtract(1, 'days').format('YYYYMMDD')
    const calendarDate = await axios.get(`https://cdn.jsdelivr.net/gh/ruyut/TaiwanCalendar/data/${thisYear}.json`)
    const checkTodayHoliday = calendarDate.data.filter(d => d.date === today)[0].isHoliday
    if (checkTodayHoliday) {
      req.flash('error_messages', '今天是假日喔')
      return next()
    }
    try {
      await prisma.punch.upsert({
        where: {
          punchIdentifier: {
            userId: getUser(req).id,
            type: punchType,
            date: today
          }
        },
        update: {
          userId: getUser(req).id,
          type: punchType,
          date: today,
          createdAt: dayjs().format()
        },
        create: {
          userId: getUser(req).id,
          type: punchType,
          date: today,
          createdAt: dayjs().format()
        }
      })
      req.flash('success_messages', '打卡成功')
      res.redirect('back')
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = userController