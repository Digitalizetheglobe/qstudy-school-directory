import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    // Create a transporter using the provided credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'qstudyworld28@gmail.com',
        pass: 'rqjv nrmz wceq yywi',
      },
    })

    // Construct the email content
    const htmlContent = `
      <h2>New Application / Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
      <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message || 'No message provided.'}</p>
    `

    // Setup email data
    const mailOptions = {
      from: 'qstudyworld28@gmail.com', // sender address
      to: 'qstudyworld28@gmail.com', // list of receivers (send to yourself)
      subject: `New Submission from ${data.name || 'Website Visitor'}`, // Subject line
      html: htmlContent, // html body
    }

    // Send mail
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: 'Email sent successfully!' }, { status: 200 })
  } catch (error: any) {
    console.error('Error sending email:', error)
    return NextResponse.json({ success: false, message: 'Failed to send email.', error: error.message }, { status: 500 })
  }
}
