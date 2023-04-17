const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()
const { getUser } = require('../helpers/auth-helpers')
const { get } = require('../routes')
const moment = require('moment')

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
    const today = moment().isAfter(moment('05:00', 'HH:mm')) ? moment().format('YYYYMMDD') : moment().subtract(1, 'days').format('YYYYMMDD')
    console.log(getUser(req))
    console.log(moment('05:00', 'HH:mm').format())
    try {
      await prisma.punch.upsert({
        where: { id: getUser(req).Punch.id ? getUser(req).Punch.id : 0 },
        update: {
          userId: getUser(req).id,
          type: punchType,
          date: today,
          createdAt: moment().format()
        },
        create: {
          userId: getUser(req).id,
          type: punchType,
          date: today,
          createdAt: moment().format()
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