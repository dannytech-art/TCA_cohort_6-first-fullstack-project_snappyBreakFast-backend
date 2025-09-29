const { createFood } = require('../controllers/foodcontrollers')
const upload = require('../middleware/multer')
const router = require('express').Router()

router.post('/restaurant/food/:id',upload.single('image') , createFood)
module.exports = router