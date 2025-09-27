const { signup, verifyOtp, resendOtp } = require('../controllers/userControllers')
const { authenticate } = require('../middleware/authentication')

const router = require('express').Router()

router.post('/user/signup', signup)

router.post('/user/otp', authenticate , verifyOtp)

router.post('/user/resend-otp', authenticate , resendOtp)

module.exports = router
