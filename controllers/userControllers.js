const userModel = require("../models/userModels");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signUpTemp } = require("../utils/emailTemplate");
const emailSender = require("../middleware/nodemailer");
const generateVerificationCode = require("../middleware/otpGenerate");
const verificationCode = generateVerificationCode()
exports.signup = async (req,res)=> {
    try {
        const { firstName, lastName, email, phoneNumber } = req.body

        const userExist = await userModel.findOne({email: email.toLowerCase(), phoneNumber})

        if (userExist) {
            return res.status(400).json({
                message: `user already exist`
            })
        }
        
        const user = new userModel({
            firstName: `${firstName[0].toUpperCase() + firstName.slice(1).toLowerCase()}`,
            lastName: `${lastName[0].toUpperCase() + lastName.slice(1).toLowerCase()}`,
            email: email.toLowerCase(),
            phoneNumber: `+234${phoneNumber.slice(1)}`
        })

        await user.save()

        const token = jwt.sign({
            id: user._id,
            email: user.email
        },process.env.JWT_SECRET,{expiresIn: '1h'})

        // const link = `${req.protocol}://${req.get('host')}/user/verify/${token}`
        const emailOption = {
        email: user.email,
        subject: 'Verify your email',
        html: signUpTemp(verificationCode, user.firstName)
    }
       
        await emailSender(emailOption)
        res.status(201).json({
            message: `Account created successfully`,
            data: user
        })
         
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
