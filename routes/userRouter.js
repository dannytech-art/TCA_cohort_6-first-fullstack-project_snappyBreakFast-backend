const { signup, verifyOtp, resendOtp } = require('../controllers/userControllers')
const { authenticate } = require('../middleware/authentication')
const { signUpValidator } = require('../middleware/validator')

const router = require('express').Router()

router.post('/user/signup', signup)

router.post('/user/otp', verifyOtp)

router.post('/user/resend-otp', authenticate , resendOtp)

module.exports = router
