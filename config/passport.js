const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const dayjs = require('dayjs')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

passport.use(new LocalStrategy(
  {
    usernameField: 'employeeCode',
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
    catch (err) {
      cb(err)
    }
  }
))

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser(async (id, cb) => {
  try {
    const specificTime = '05:00:00';
    const todaySpecificTime = dayjs(`${dayjs().format('YYYY-MM-DD')} ${specificTime}`)
    const startTime = dayjs().isAfter(todaySpecificTime.format()) ? todaySpecificTime.format() : todaySpecificTime.subtract(1, 'days').format()
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        employeeCode: true,
        Punch: {
          take: 1,
          select: {
            createdAt: true
          },
          where: {
            createdAt: {
              gte: startTime
            },
            type: {
              equals: "in"
            }
          },
          orderBy: {
            createdAt: "asc"
          }
        }
      }
    })
    return cb(null, user)
  }
  catch (err) {
    return cb(err)
  }
})

module.exports = passport