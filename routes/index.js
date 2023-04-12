const express = require('express')
const router = express.Router()

const userController = require('../controllers/user-controller')

router.get('/test', (req, res)=> res.send('hello'))
router.get('/signin', userController.signInPage)

module.exports = router