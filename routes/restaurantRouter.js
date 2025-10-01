const { createRestaurant, getAllRestaurants } = require('../controllers/restaurantcontroller')
const upload = require('../middleware/multer')
const router = require('express').Router()

router.post('/restaurant',upload.single('image') ,createRestaurant)

router.get('/restaurants', getAllRestaurants)
module.exports = router