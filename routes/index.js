const express = require('express')
const router = express.Router()

const passport = require('../config/passport')
const userController = require('../controllers/user-controller')
const punchController = require('../controllers/punch-controller')
const { generalErrorHandler } = require('../middleware/error-handler')
const { authenticated } = require('../middleware/auth')

router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)

router.get('/users/:id/edit', authenticated, userController.editUser)
router.put('/users/:id', authenticated, userController.putUser)
router.post('/users/:id/punch', authenticated, userController.punch)

router.get('/dashboard', authenticated, punchController.getDashboard)

router.use('/', (req, res) => res.redirect('/dashboard'))
router.use('/', generalErrorHandler)

module.exports = router