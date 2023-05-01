//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const nodemailer = require("nodemailer");
const sendEmail= async(dest:string,subject:string,message:string)=>{
    
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user:"trainingsytem11@gmail.com"
        //    process.env.SENDEREMAIL
        , // generated ethereal user
          pass: 'stqmwejhkhufabpw'
        //   process.env.SENDEPASS
        , // generated ethereal password
        }, 
        tls:{
            rejectUnauthorized:false
        }
      });

      let info = await transporter.sendMail({
        from:"PTUK training system, trainingsytem11@gmail.com" , 
        to:dest, // list of receivers
        subject:subject, // Subject line
        text:message, 
      });
      console.log(info);
}
export default{sendEmail}; 