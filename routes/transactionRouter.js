const { initiateTransaction, verifyTransaction } = require('../controllers/transactionController')
const { authenticate } = require('../middleware/authentication')

const router = require('express').Router()

router.get('/transaction/payment/:foodId', authenticate,initiateTransaction)

router.get('/transaction/verify', verifyTransaction)

module.exports = router