const { signup } = require('../controllers/userControllers')

const router = require('express').Router()

router.post('/user/signup', signup)

module.exports = router
