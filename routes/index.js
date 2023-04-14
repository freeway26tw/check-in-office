const express = require('express')
const router = express.Router()

const passport = require('../config/passport')
const userController = require('../controllers/user-controller')
const punchController = require('../controllers/punch-controller')

router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)

router.get('/users/:id/edit', userController.editUser)

router.get('/punch', punchController.getPunch)

module.exports = router