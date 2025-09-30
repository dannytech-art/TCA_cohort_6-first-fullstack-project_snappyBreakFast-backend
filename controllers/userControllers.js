const userModel = require("../models/userModels");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signUpTemp, loginTemp } = require("../utils/emailTemplate");
const emailSender = require("../middleware/nodemailer");
const generateVerificationCode = require("../middleware/otpGenerate");
const { otp, expiresAt } = generateVerificationCode()
exports.signup = async (req,res)=> {
    try {
        const { firstName, lastName, email, phoneNumber } = req.body

        const userExist = await userModel.findOne({
            $or: [{ email: email.toLowerCase() }, { phoneNumber }]
        });

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
        user.otp = otp
        user.otpExpiry = expiresAt
        await user.save()

        const token = jwt.sign({
            id: user._id,
            email: user.email
        },process.env.JWT_SECRET,{expiresIn: '1h'})

        // const link = `${req.protocol}://${req.get('host')}/user/verify/${token}`
        const emailOption = {
        email: user.email,
        subject: 'Verify your email',
        html: signUpTemp(otp, user.firstName)
    }
       
        await emailSender(emailOption)
        res.status(201).json({
            message: `Account created successfully`,
            data: user,
            token
        })
         
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body; // frontend sends both

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 1. Check expiry first
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // 2. Then check value
    if (String(user.otp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 3. Mark verified
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // 4. Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Account verified successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: error.message });
  }
};
exports.resendOtp = async (req, res) => {
  try {
    const decodedId = req.user.id;
    const user = await userModel.findById(decodedId);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "User already verified" });

    // Prevent spamming before expiry
    if (user.otp && user.otpExpiry > Date.now()) {
      return res.status(400).json({
        message: "You can only request a new OTP after the current one expires"
      });
    }

    // 🔹 Generate new OTP & expiry
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    user.otp = otp;
    user.otpExpiry = expiresAt;
    await user.save();

    const emailOption = {
      email: user.email,
      subject: "Verify your email",
      html: signUpTemp(otp, user.firstName)
    };
    await emailSender(emailOption);

    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { otp } = req.body;
    const decodedId = req.user.id;

    const user = await userModel.findById(decodedId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check OTP
    if (user.otp !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check expiry
    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Mark verified (if this is your login flow)
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Signin successful",
      data: user,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
