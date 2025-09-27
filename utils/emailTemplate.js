const signUpTemp =(verificationCode,firstName)=>{
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SnapBreakfast Verification</title>
</head>
<body style="margin:0; padding:0; background-color:rgba(255, 255, 255, 1); font-family: Arial, sans-serif;">

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding:40px 0;">
        
        <!-- Main container -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background:#fff; border:2px solid black; border-radius:6px; padding:40px;">
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <!-- Replace heading with logo -->
              <img src="https://res.cloudinary.com/djxoqpt9t/image/upload/v1758924386/snapbreakfast_logo_qyuo5n.png" alt="SnapBreakfast Logo" width="250" style="display:block; margin:0 auto;"/>
            </td>
          </tr>
          <tr>
            <td style="font-size:16px; color:#333; padding-bottom:20px;">
              <p style="margin:0;">Please verify your identity, <strong>${firstName}</strong></p>
            </td>
          </tr>
          <tr>
            <td style="background:#f6f6f6; padding:20px; text-align:center; font-size:18px; border-radius:4px;">
              <p style="margin:0;">Here is your SnapBreakfast verification code:</p>
              <p style="font-size:26px; font-weight:bold; color:#333; margin:10px 0;">${verificationCode}</p>
              <p style="margin:0; font-size:14px; color:#555;">This code is valid for <strong>15 minutes</strong> and can only be used once.</p>
            </td>
          </tr>
          <tr>
            <td style="padding-top:20px; font-size:14px; color:#555;">
              <p style="margin:0;"><strong>Please don't share this code with anyone:</strong> SnapBreakfast will never ask for it on the phone or via email.</p>
            </td>
          </tr>
          <tr>
            <td style="padding-top:20px; font-size:14px; color:#555;">
              <p style="margin:0;">Thanks,<br>The SnapBreakfast Team</p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>

    `
}

module.exports = {signUpTemp}
