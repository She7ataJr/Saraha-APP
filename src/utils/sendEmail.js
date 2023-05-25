
import nodemailer from "nodemailer"

async function sendEmail({to=[],subject,cc,bcc,text,attachments=[]}={}) {

  let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"muhammad Shehata for testing" <${process.env.EMAIL}>`, // sender address
    to: "She7ataJr@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log(info);
  return info.rejected.length?false:true
} 

export default sendEmail