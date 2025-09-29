const Foodmodel = require('../models/foodmodel');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const resturantmodel = require('../models/resturantModel');

// Create a new food item   
exports.createFood = async (req, res) => {
    try {
        const {id} = req.params
        const { name, price, description } = req.body;
        const file = req.file;
        const restaurant = await resturantmodel.findById(id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
          }
        const existingFood = await Foodmodel.findOne({ name });
        if (existingFood) {
          return res.status(400).json({ message: "Food item already exists" });
        }
         const foodImage = await cloudinary.uploader.upload(file.path, {
            folder: 'SnapBreakfast/Food',
            use_filename: true,
            transformation: [
            { width: 500, height: 500, crop: "fill", gravity: "auto" }  
                ]
            });
            const Image = {
                url: foodImage.secure_url,
                publicId: foodImage.public_id
            };
            if (fs.existsSync(file.path )) {
                fs.unlinkSync(file.path);
              }
        const food = new Foodmodel({
            name,
            price,
            description,
            image: Image,
            restaurantId: id
        });
        restaurant.foodIds.push(food._id);
        await food.save();
        await restaurant.save();
        res.status(201).json({
            message: `Food item created successfully`,
            data: food
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};