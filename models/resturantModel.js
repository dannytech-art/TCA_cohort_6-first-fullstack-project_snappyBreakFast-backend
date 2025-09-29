const mongoose = require('mongoose')

const resturantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    coverImage: {
        url:{
            type: String,
            require: true
        },
        publicId: {
            type: String,
            require: true
        }
    },
    foodIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'foods'
        }
    ]
    },{ timestamps: true })

    const resturantmodel = mongoose.model('resturants',resturantSchema)

    module.exports = resturantmodel