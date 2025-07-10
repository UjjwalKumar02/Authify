import nodemailer from "nodemailer";



export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify((error) => {
  if(error){
    console.log("Email transport error: ", error);
  } else {
    console.log("Email transport is ready");
  }
});



export const sendVerificationEmail = async(to: string, username: string, code: string) => {
  const mailOptions = {
    from: `"Auth-app" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your verification code",
    html: `
      <p>Hi ${username},</p>
      <p>Your verification code is:</p>
      <h2>${code}</h2>
      <p>This code will expire in 10 minutes.</p>
    `
  };

  await transporter.sendMail(mailOptions);
}