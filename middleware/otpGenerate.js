const generateVerificationCode = () =>{
    
  const generateOTP = Math.floor(1000 + Math.random() * 9000);
    return generateOTP;
}
module.exports = generateVerificationCode

