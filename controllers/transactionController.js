const transactionModel = require("../models/transactionModel");
const axios = require("axios");
const userModel = require("../models/userModels");
const Foodmodel = require("../models/foodmodel");

exports.initiateTransaction = async (req, res) => {
  try {
    const { foodId } = req.params;
    const {id} = req.user;
    const user = await userModel.findById(id);
    const food = await Foodmodel.findById(foodId);   
    if(!user){
      return res.status(404).json({
        message: "User not found"
      });
    }
    const ref = `SNAP-BREAKFAST_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const data = {
      amount: food.price, // Convert to smallest currency unit
      currency: "NGN",
      customer:{
        email: user.email,
        name: user.firstName
      },
      reference: ref
    };
    const response = await axios.post("https://api.korapay.com/merchant/api/v1/charges/initialize", data, {
        headers: {
            Authorization: `Bearer ${process.env.KORA_SECRETE}`,
            "Content-Type": "application/json"
        }
    });

    const transaction = new transactionModel({
      amount: food.price,
      userId: user._id,
      reference: ref,
      foodId: food._id
    });
    await transaction.save();
    res.status(200).json({
      message: "Transaction initiated",
      data: {
        reference: response?.data?.data?.reference,
        url: response?.data?.data?.checkout_url
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
};

exports.verifyTransaction = async (req, res) => {
    try{
        const {reference} = req.query;

        const response = await axios.get(`https://api.korapay.com/merchant/api/v1/charges/${reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.KORA_SECRETE}`,
                "Content-Type": "application/json"
            }
        });

        const transaction = await transactionModel.findOne({reference});
        if(!transaction){
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        if(response?.data?.data?.status === "success"){
            transaction.status = "successful";
            await transaction.save();
            return res.status(200).json({
                message: "Transaction successful"
            });
        }else{
            transaction.status = "Failed";
            await transaction.save();
            return res.status(400).json({
                message: "Transaction failed"
            });
        }    
    }catch(error){
      res.status(500).json({
        message: error.message
      })
    }
}