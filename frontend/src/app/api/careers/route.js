import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

const ADMIN = process.env.ADMIN_EMAIL || 'soumyashipower@gmail.com'

export async function POST(request) {
  try {
    const { name, email, phone, position, coverLetter } = await request.json()

    if (!name || !email || !position) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email to admin
    await transporter.sendMail({
      from: `"Soumyashi Power Website" <${process.env.GMAIL_USER}>`,
      to: ADMIN,
      replyTo: email,
      subject: `Job Application — ${position} — ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#3b82f6,#1d4ed8);padding:28px;border-radius:12px 12px 0 0;">
            <h1 style="color:white;margin:0;font-size:22px;">New Job Application</h1>
            <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;">${position}</p>
          </div>
          <div style="background:#fff;padding:28px;border:1px solid #e8d5b0;border-top:none;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;color:#a8917a;font-size:13px;width:100px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;font-weight:bold;">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;color:#a8917a;font-size:13px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;"><a href="mailto:${email}" style="color:#3b82f6;">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;color:#a8917a;font-size:13px;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;"><a href="tel:${phone}" style="color:#3b82f6;">${phone || '—'}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;color:#a8917a;font-size:13px;">Position</td><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;font-weight:bold;">${position}</td></tr>
              ${coverLetter ? `<tr><td style="padding:10px 0;color:#a8917a;font-size:13px;vertical-align:top;">Cover Letter</td><td style="padding:10px 0;">${coverLetter}</td></tr>` : ''}
            </table>
          </div>
          <div style="background:#1a1208;padding:16px;border-radius:0 0 12px 12px;text-align:center;">
            <p style="color:#a8917a;margin:0;font-size:11px;">Soumyashi Power Limited</p>
          </div>
        </div>
      `
    })

    // Auto-reply
    await transporter.sendMail({
      from: `"Soumyashi Power" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Application Received — ${position} at Soumyashi Power`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#3b82f6,#1d4ed8);padding:28px;border-radius:12px 12px 0 0;">
            <h1 style="color:white;margin:0;font-size:22px;">Application Received!</h1>
          </div>
          <div style="background:#fff;padding:28px;border:1px solid #e8d5b0;border-top:none;">
            <p style="color:#1a1208;">Dear ${name},</p>
            <p style="color:#78614a;line-height:1.7;">
              Thank you for applying for the <strong>${position}</strong>
              position at Soumyashi Power. We have received your application
              and our HR team will review it within <strong style="color:#3b82f6;">5 business days</strong>.
            </p>
            <p style="color:#78614a;font-size:13px;">
              If you have any questions, email us at soumyashipower@gmail.com
            </p>
          </div>
          <div style="background:#1a1208;padding:16px;border-radius:0 0 12px 12px;text-align:center;">
            <p style="color:#a8917a;margin:0;font-size:11px;">Soumyashi Power Limited</p>
          </div>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Careers API error:', error)
    return NextResponse.json(
      { error: 'Failed to submit application.' },
      { status: 500 }
    )
  }
}
