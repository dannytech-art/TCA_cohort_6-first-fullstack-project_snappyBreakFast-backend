const { createResturant, getAllResturants } = require('../controllers/resturantcontroller')
const upload = require('../middleware/multer')
const router = require('express').Router()

router.post('/restaurant',upload.single('image') ,createResturant)

router.get('/restaurants', getAllResturants)
module.exports = router