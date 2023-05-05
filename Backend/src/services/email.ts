import nodemailer from "nodemailer";
export const sendEmail = (dest: string, subject: string, message: string) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "trainingsytem11@gmail.com"
        //    process.env.SENDEREMAIL
        , // generated ethereal user
        pass: 'stqmwejhkhufabpw'
        //   process.env.SENDEPASS
        , // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    //   const mailOptions = {
    //             from: auth.user,
    //             to: email,
    //             subject: subject,
    //             text: text
    //         };
    //         transporter.sendMail(mailOptions, function (error, info) {
    //             if (error) {
    //                 console.log(error);
    //             } else {
    //                 console.log('Email sent: ' + info.response);
    //             }

    let info = transporter.sendMail({
      from: "trainingsytem11@gmail.com",
      to: dest, // list of receivers
      subject: subject, // Subject line
      text: message,
    });
    console.log(info);
  }
  catch (err) {
    console.log(err)
  }
}
export default { sendEmail }; 