const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')
const bcrypt = require('bcryptjs')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

passport.use(new LocalStrategy(
  {
    usernameField: 'employeeCode',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req, employeeCode, password, cb) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          employeeCode
        }
      })
      if (!user) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤!'))
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤!'))
      return cb(null, user)
    }
    catch (e) {
      console.log(e)
    }
  }
))

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  return prisma.user.findUnique({
    where: {
      id
    }
  })
    .then(user => cb(null, user))
    .catch(err => cb(err))
})

module.exports = passport