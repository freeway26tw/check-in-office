const { PrismaClient } = require('@prisma/client')
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
  editUser: async (req, res, next) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: getUser(req).id
        }
      })
      if (!user) throw new Error('沒有此使用者')
      return res.render('users/edit', { user })
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = userController