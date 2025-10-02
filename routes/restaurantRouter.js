const { createRestaurant, getAllRestaurants, getRestaurantById } = require('../controllers/restaurantcontroller')
const upload = require('../middleware/multer')
const router = require('express').Router()

router.post('/restaurant',upload.single('image') ,createRestaurant)

router.get('/restaurants', getAllRestaurants)

router.get('/restaurant/:id', getRestaurantById)
module.exports = router