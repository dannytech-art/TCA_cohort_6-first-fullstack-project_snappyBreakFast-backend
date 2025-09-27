const { signup, verifyOtp } = require('../controllers/userControllers')
const { authenticate } = require('../middleware/authentication')

const router = require('express').Router()

router.post('/user/signup', signup)

router.post('/user/otp', authenticate , verifyOtp)
module.exports = router
