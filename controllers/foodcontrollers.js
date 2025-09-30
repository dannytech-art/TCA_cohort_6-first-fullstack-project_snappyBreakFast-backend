const Foodmodel = require('../models/foodmodel');
const cloudinary = require('../config/cloudinary');
const resturantmodel = require('../models/resturantModel');

// Helper to upload from memory buffer
function uploadToCloudinary(fileBuffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "SnapBreakfast/Food",
        use_filename: true,
        transformation: [
          { width: 500, height: 500, crop: "fill", gravity: "auto" }
        ],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(fileBuffer); // send buffer
  });
}

// Create a new food item   
exports.createFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const file = req.file;

    // 1. Check restaurant
    const restaurant = await resturantmodel.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // 2. Check food name duplication
    const existingFood = await Foodmodel.findOne({ name });
    if (existingFood) {
      return res.status(400).json({ message: "Food item already exists" });
    }

    // 3. Upload to Cloudinary directly from memory
    if (!file) {
      return res.status(400).json({ message: "Image is required" });
    }
    const foodImage = await uploadToCloudinary(file.buffer);

    const Image = {
      url: foodImage.secure_url,
      publicId: foodImage.public_id
    };

    // 4. Create and save food
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
    });
  }
};
