import nodemailer from 'nodemailer'
let transporter=nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:'rodrirwigara@gmail.com',
    pass:'0787910406'
  }
})
function createResetPasswordToken(email:any) {
    const token = Math.random().toString(36).substring(2, 10);
    console.log(`Reset token for ${email}: ${token}`);

    let mailOptions = {
    from: 'rodrirwigara@gmail.com',
    to: email,
    subject: 'Reset Your Password',
    text: `Hello,\n\nYou have requested to reset your password. Please click on the following link to reset your password: ://yourwebsite.com/reset?token=${token}\n\nIf you did not request this, please ignore this email.`,
   
  };  
 
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      // res.json('Email sent: ' + info.response);
    }
  });

  return token;
}  
createResetPasswordToken('user_email@example.com');