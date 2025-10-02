const restaurantmodel = require("../models/restaurantModel");
const cloudinary = require("../config/cloudinary");
const fs = require('fs');
// Create a new restaurant
exports.createRestaurant = async (req, res) => {
    try {
        const { name, description, time } = req.body;
        const file = req.file;

        const existingRestaurant = await restaurantmodel.findOne({ name });
        if (existingRestaurant) {
          return res.status(400).json({ message: "Restaurant already exists" });
        }
         
       const cloudImage = await cloudinary.uploader.upload(file.path, {
        folder: 'SnapBreakfast/Restaurant',
        use_filename: true,
        transformation: [
        { width: 500, height: 250, crop: "fill", gravity: "auto" }
         ]
       });
         const Image = {   
            url: cloudImage.secure_url,
            publicId: cloudImage.public_id
         };

         if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
    
        
        const retaturant = new restaurantmodel({
            name,
            description,
            time,
            coverImage: Image
        });
        await restaurant.save();
        res.status(201).json({
            message: `Restaurant created successfully`,
            data: restaurant
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};
exports.getAllRestaurants = async (req, res) => {
    try {
        const resturants = await restaurantmodel.find().populate('foodIds');
        res.status(200).json({
            message: 'Restaurants fetched successfully',
            data: resturants
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }   
};
exports.getRestaurantById = async (req, res) => {
    try {
        const {id} = req.params
        const restaurant = await restaurantmodel.findById(id).populate('foodIds');
        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            })
        }
        res.status(200).json({
            message: "Restaurant fetched successfully",
            data: restaurant
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}