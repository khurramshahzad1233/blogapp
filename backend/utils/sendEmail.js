const nodeMailer=require("nodemailer")
const sendEmail=async(options)=>{
    const transporter=nodeMailer.createTransport({
        port:process.env.smpt_port,
        host:process.env.smpt_host,
        service:process.env.smpt_service,
        auth:{
            user:process.env.smpt_mailer,
            pass:process.env.smpt_password,
        }
    });
    const mailoptions={
        to:process.env.smpt_mailer,
        from:options.email,
        subject:options.subject,
        text:options.message,
    };
    await transporter.sendMail(mailoptions)
};
module.exports=sendEmail;