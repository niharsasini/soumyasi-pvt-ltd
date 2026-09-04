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
const COMPANY = 'Soumyashi Power Limited'
const PHONE1 = '+91 94376 11129'
const PHONE2 = '+91 73810 76808'
const ADDRESS = 'MIG-126, Bhimatangi Housing Colony, Bhubaneswar, Odisha 751002'

function wrapper(color, title, content) {
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
    <div style="background:${color};padding:28px;border-radius:12px 12px 0 0;">
      <h1 style="color:white;margin:0;font-size:22px;">${title}</h1>
    </div>
    <div style="background:#fff;padding:28px;border:1px solid #e8d5b0;border-top:none;">
      ${content}
    </div>
    <div style="background:#1a1208;padding:16px;border-radius:0 0 12px 12px;text-align:center;">
      <p style="color:#a8917a;margin:0;font-size:11px;">${COMPANY} · ${ADDRESS}</p>
    </div>
  </div>`
}

export async function POST(request) {
  try {
    const { name, email, phone, service, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email to admin
    await transporter.sendMail({
      from: `"${COMPANY} Website" <${process.env.GMAIL_USER}>`,
      to: ADMIN,
      replyTo: email,
      subject: `New Enquiry — ${name} (${service || 'General'})`,
      html: wrapper(
        'linear-gradient(135deg,#f59e0b,#d97706)',
        '📩 New Contact Enquiry',
        `
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;color:#a8917a;font-size:13px;width:100px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;font-weight:bold;">${name}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;color:#a8917a;font-size:13px;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;"><a href="tel:${phone}" style="color:#d97706;">${phone || 'Not provided'}</a></td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;color:#a8917a;font-size:13px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;"><a href="mailto:${email}" style="color:#d97706;">${email}</a></td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;color:#a8917a;font-size:13px;">Service</td><td style="padding:10px 0;border-bottom:1px solid #f0e6d0;">${service || 'General'}</td></tr>
          <tr><td style="padding:10px 0;color:#a8917a;font-size:13px;vertical-align:top;">Message</td><td style="padding:10px 0;">${message}</td></tr>
        </table>
        <div style="margin-top:20px;padding:14px;background:#fffbf0;border-radius:8px;border-left:4px solid #d97706;">
          <p style="margin:0;color:#78614a;font-size:13px;">Hit Reply to respond directly to ${name}</p>
        </div>
        `
      )
    })

    // Auto-reply to user
    await transporter.sendMail({
      from: `"${COMPANY}" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Thank you for contacting Soumyashi Power`,
      html: wrapper(
        'linear-gradient(135deg,#f59e0b,#d97706)',
        `Thank you, ${name}!`,
        `
        <p style="color:#1a1208;">Dear ${name},</p>
        <p style="color:#78614a;line-height:1.7;">
          Thank you for reaching out to Soumyashi Power.
          We have received your enquiry and will get back to you
          within <strong style="color:#d97706;">24 hours</strong>.
        </p>
        <p style="color:#78614a;">For urgent queries, call us:</p>
        <div style="margin:16px 0;">
          <a href="tel:${PHONE1.replace(/\s/g, '')}" style="display:inline-block;background:#d97706;color:white;padding:10px 20px;border-radius:50px;text-decoration:none;font-weight:bold;font-size:14px;margin-right:8px;">${PHONE1}</a>
          <a href="tel:${PHONE2.replace(/\s/g, '')}" style="display:inline-block;background:#f59e0b;color:white;padding:10px 20px;border-radius:50px;text-decoration:none;font-weight:bold;font-size:14px;">${PHONE2}</a>
        </div>
        <div style="background:#fffbf0;border-radius:8px;padding:14px;margin-top:16px;">
          <p style="margin:0;color:#78614a;font-size:13px;">
            <strong>Your enquiry:</strong> ${service || 'General Enquiry'}<br/>
            ${message.substring(0, 120)}${message.length > 120 ? '...' : ''}
          </p>
        </div>
        `
      )
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Failed to send. Please call us directly.' },
      { status: 500 }
    )
  }
}
