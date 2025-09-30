const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  image: {
    url: {  
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    }
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurants',
    required: true
  }
}, { timestamps: true });

const Foodmodel = mongoose.model('foods', foodSchema);

module.exports = Foodmodel;