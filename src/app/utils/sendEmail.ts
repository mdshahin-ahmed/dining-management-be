import nodemailer from 'nodemailer'

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    // port: 587,
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'arifmultimedia26@gmail.com',
      pass: 'yaub kmyq druv fkwc',
    },
  })

  await transporter.sendMail({
    from: 'arifmultimedia26@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within 10 minutes!', // Subject line
    text: '', // plain text body
    html, // html body
  })
}
