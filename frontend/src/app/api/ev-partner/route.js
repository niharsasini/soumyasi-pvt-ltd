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
    const body = await request.json()
    const {
      name, phone, email, locationType,
      address, googleMapsLink, city,
      space, electrical, message, files_uploaded
    } = body

    if (!name || !phone || !email || !city) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email to admin
    await transporter.sendMail({
      from: `"${COMPANY} Website" <${process.env.GMAIL_USER}>`,
      to: ADMIN,
      subject: `⚡ EV Partner Application — ${name}, ${city}`,
      html: wrapper(
        'linear-gradient(135deg,#059669,#047857)',
        '⚡ New EV Partner Application',
        `
        <div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:8px;padding:16px;margin-bottom:20px;">
          <p style="margin:0;color:#065f46;font-weight:bold;font-size:15px;">⏰ Call ${name} within 48 hours</p>
          <a href="tel:${phone.replace(/\s/g, '')}" style="display:block;color:#059669;font-size:20px;font-weight:bold;margin-top:6px;">${phone}</a>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;color:#a8917a;font-size:13px;width:130px;">Name</td><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;font-weight:bold;">${name}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;color:#a8917a;font-size:13px;">Phone</td><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;"><a href="tel:${phone}" style="color:#059669;font-weight:bold;">${phone}</a></td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;color:#a8917a;font-size:13px;">Email</td><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;"><a href="mailto:${email}" style="color:#059669;">${email}</a></td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;color:#a8917a;font-size:13px;">Location Type</td><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;">${locationType || '—'}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;color:#a8917a;font-size:13px;">City</td><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;font-weight:bold;">${city}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;color:#a8917a;font-size:13px;">Address</td><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;">${address || '—'}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;color:#a8917a;font-size:13px;">Google Maps</td><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;">${googleMapsLink ? `<a href="${googleMapsLink}" style="color:#059669;">View Map</a>` : '—'}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;color:#a8917a;font-size:13px;">Space</td><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;">${space ? space + ' sq ft' : '—'}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;color:#a8917a;font-size:13px;">3-Phase Power</td><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;">${electrical || '—'}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;color:#a8917a;font-size:13px;">Documents</td><td style="padding:8px 0;border-bottom:1px solid #f0e6d0;">${files_uploaded || 'None'}</td></tr>
          ${message ? `<tr><td style="padding:8px 0;color:#a8917a;font-size:13px;vertical-align:top;">Notes</td><td style="padding:8px 0;">${message}</td></tr>` : ''}
        </table>
        `
      )
    })

    // Auto-reply to applicant
    await transporter.sendMail({
      from: `"${COMPANY}" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `EV Partner Application Received — Soumyashi Power`,
      html: wrapper(
        'linear-gradient(135deg,#059669,#047857)',
        'Application Received! ✓',
        `
        <p style="color:#1a1208;">Dear ${name},</p>
        <p style="color:#78614a;line-height:1.7;">
          Thank you for applying to our EV Charging Partner Programme.
          We have received your application for
          <strong style="color:#059669;">${city}</strong>
          and will conduct a <strong>free site assessment
          within 48 hours</strong>.
        </p>
        <div style="background:#ecfdf5;border-radius:8px;padding:20px;margin:20px 0;">
          <h3 style="color:#065f46;margin:0 0 12px;font-size:15px;">What happens next?</h3>
          <ol style="color:#78614a;padding-left:20px;margin:0;line-height:1.8;">
            <li>Our engineer calls you to schedule a site visit</li>
            <li>Free site assessment at your location</li>
            <li>Technical design and partnership agreement</li>
            <li>Charger installation (3–5 weeks)</li>
            <li>Go live and start earning!</li>
          </ol>
        </div>
        <p style="color:#78614a;font-size:13px;">For urgent queries:</p>
        <a href="tel:${PHONE1.replace(/\s/g, '')}" style="display:inline-block;background:#059669;color:white;padding:10px 20px;border-radius:50px;text-decoration:none;font-weight:bold;">${PHONE1}</a>
        `
      )
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('EV Partner API error:', error)
    return NextResponse.json(
      { error: 'Failed to send. Please call us directly.' },
      { status: 500 }
    )
  }
}
