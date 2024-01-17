import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/src/models/User";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hased token
    const rowToken = await bcryptjs.hash(userId.toString(), 10);
    const hashedToken = rowToken.replace(/[^a-zA-Z0-9]/g, "");

    console.log(email);
    if (emailType === "VERIFY") {
      const user = await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
      console.log(user);
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // var transport = nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: "d26c3f627b0267",
    //     pass: "d07a437e176296",
    //   },
    // });
    var transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "a01141399246@gmail.com",
        pass: "eujxqtzwefhbyxnd",
        //TODO: add these credentials to .env file
      },
    });

    const mailOptions = {
      name: "badeel",
      from: "a01141399246@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
