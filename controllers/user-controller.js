const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()
const { getUser } = require('../helpers/auth-helpers')
const { get } = require('../routes')

const userController = {
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    res.redirect('/dashboard')
  },
  logout: async (req, res) => {
    await req.logout(function (err) {
      if (err) { return next(err); }
      req.flash('success_messages', '登出成功!')
      res.redirect('/signin')
    })
  },
  editUser: async (req, res, next) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: getUser(req).id
        },
        select: {
          employeeCode: true
        }
      })
      if (!user) throw new Error('沒有此使用者')
      return res.render('users/edit', { user })
    }
    catch (err) {
      next(err)
    }
  },
  putUser: async (req, res, next) => {
    const { employeeCode, password } = req.body
    if (!password) throw new Error('Password is required!')
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
  },
  punch: async (req, res, next) => {
    const { punchType } = req.body
    try {
      await prisma.punch.create({
        data: {
          userId: getUser(req).id,
          type: punchType,
          createdAt: new Date().now
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