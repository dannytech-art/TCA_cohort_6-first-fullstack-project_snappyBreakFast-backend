const { signup, verifyOtp, resendOtp, signinEmail, signinotp, getAllUsers, getUserById } = require('../controllers/userControllers')
const { authenticate } = require('../middleware/authentication')
const { signUpValidator } = require('../middleware/validator')

const router = require('express').Router()

router.post('/user/signup', signup)

router.post('/user/signin/email', signinEmail)

router.post('/user/signin/otp', signinotp)

router.post('/user/otp', verifyOtp)

router.post('/user/resend-otp', authenticate , resendOtp)

router.get('/users',getAllUsers)

router.get('/user/:id', getUserById)

module.exports = router
