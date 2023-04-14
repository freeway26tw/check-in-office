const express = require('express')
const router = express.Router()

const passport = require('../config/passport')
const userController = require('../controllers/user-controller')
const punchController = require('../controllers/punch-controller')

const { authenticated } = require('../middleware/auth')

router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)

router.get('/users/:id/edit', authenticated, userController.editUser)
router.put('/users/:id', authenticated, userController.putUser)

router.get('/dashboard', authenticated, punchController.getDashboard)

module.exports = router