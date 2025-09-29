const resturantmodel = require("../models/resturantModel");
const cloudinary = require("../config/cloudinary");
const fs = require('fs');
// Create a new restaurant
exports.createResturant = async (req, res) => {
    try {
        const { name, description, time } = req.body;
        const file = req.file;

        const existingResturant = await resturantmodel.findOne({ name });
        if (existingResturant) {
          return res.status(400).json({ message: "Restaurant already exists" });
        }
         
       const cloudImage = await cloudinary.uploader.upload(file.path, {
        folder: 'SnapBreakfast/Resturant',
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
    
        
        const resturant = new resturantmodel({
            name,
            description,
            time,
            coverImage: Image
        });
        await resturant.save();
        res.status(201).json({
            message: `Resturant created successfully`,
            data: resturant
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};
exports.getAllResturants = async (req, res) => {
    try {
        const resturants = await resturantmodel.find().populate('foodIds');
        res.status(200).json({
            message: 'Resturants fetched successfully',
            data: resturants
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }   
};