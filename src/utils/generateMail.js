import nodemailer from 'nodemailer'

const generateMail = async function(user, subject, message) {
    try {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from: "Hello 👋 <noreply@gmail.com>",
            to: user.email,
            subject: subject,
            html: message
        }

        await transport.sendMail(mailOptions)
        return {message: `${subject} link has been send to your email`}
    } 
    catch (error) 
    {
        console.log(error);
    }
}

export default generateMail