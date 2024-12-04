import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    // port: 587,
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: config.app_email,
      pass: config.app_password,
    },
  })

  await transporter.sendMail({
    from: config.app_email, // sender address
    to, // list of receivers
    subject: 'Reset your ASFCS password within 10 minutes!', // Subject line
    text: '', // plain text body
    html, // html body
  })
}
