const nodemailer = require("nodemailer")

async function sendMail(to, message){
        let transporter = nodemailer.createTransport({
          host: "gmail",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "appletreegs@gmail.com", // generated ethereal user
            pass: "jackemily", // generated ethereal password
          },
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: 'appletreegs@gmail.com', // sender address
          to: "stuartbfong@gmail.com, appletreegs@gmail.com", // list of receivers
          subject: "New Order", // Subject line
          text: message, // plain text body
          html: "<b>Hello world?</b>", // html body
        });
      
      
}

module.exports = {sendMail}