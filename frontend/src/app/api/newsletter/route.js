import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(request) {
  try {
    const { email } = await request.json()
    if (!email) return NextResponse.json(
      { error: 'Email required' }, { status: 400 }
    )

    await transporter.sendMail({
      from: `"Soumyashi Power Website" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || 'soumyashipower@gmail.com',
      subject: `New Newsletter Subscriber — ${email}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;
          margin:0 auto;background:#fff;border:1px solid #e8d5b0;
          border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#f59e0b,#d97706);
            padding:20px;">
            <h2 style="color:white;margin:0;font-size:18px;">
              New Newsletter Subscriber
            </h2>
          </div>
          <div style="padding:20px;">
            <p style="color:#78614a;margin:0;">
              Email: <strong style="color:#1a1208;">${email}</strong>
            </p>
          </div>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json(
      { error: 'Failed' }, { status: 500 }
    )
  }
}
