const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foods',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    
    reference: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['pending', 'successful', 'failed'],
        default: 'pending'
    }
    },{ timestamps: true })

    const transactionModel = mongoose.model('transactions',transactionSchema)

    module.exports = transactionModel