const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
})

const FROM = `"Golden Hands Driving School" <${process.env.EMAIL_USER}>`
const SCHOOL_NAME = 'Golden Hands Driving School'

/**
 * Send booking confirmation email to the student.
 */
async function sendBookingConfirmation(booking, userEmail) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return
  const html = `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: #FFC107; padding: 24px; text-align: center;">
        <h1 style="margin:0; color:#000; font-size:28px; font-weight:900; letter-spacing:2px;">GOLDEN HANDS</h1>
        <p style="margin:4px 0 0; color:#000;">Driving School — Booking Confirmation</p>
      </div>
      <div style="padding: 32px;">
        <h2 style="color: #FFC107;">🎉 Booking Confirmed!</h2>
        <p style="color:#ccc;">Hi <strong style="color:#fff">${booking.name}</strong>, your booking has been successfully submitted!</p>
        <div style="background:#1a1a1a; border-radius:8px; padding:20px; margin:20px 0; border-left: 4px solid #FFC107;">
          <p><strong style="color:#FFC107">Service:</strong> <span style="color:#fff">${booking.service}</span></p>
          <p><strong style="color:#FFC107">Time Slot:</strong> <span style="color:#fff">${booking.timeSlot || 'To be confirmed'}</span></p>
          <p><strong style="color:#FFC107">Phone:</strong> <span style="color:#fff">${booking.phone}</span></p>
          ${booking.address ? `<p><strong style="color:#FFC107">Address:</strong> <span style="color:#fff">${booking.address}</span></p>` : ''}
        </div>
        <p style="color:#ccc;">Our team will contact you within <strong style="color:#fff">24 hours</strong> to confirm your schedule.</p>
        <p style="color:#ccc; margin-top:24px;">Need to reach us? Call: <a href="tel:+919040040165" style="color:#FFC107;">+91 9040040165</a></p>
      </div>
      <div style="background:#000; padding:16px; text-align:center; color:#666; font-size:12px;">
        &copy; 2024 ${SCHOOL_NAME} | Bhubaneswar, Odisha
      </div>
    </div>
  `
  await transporter.sendMail({
    from: FROM,
    to: userEmail,
    subject: `✅ Booking Confirmed — ${SCHOOL_NAME}`,
    html,
  })
}

/**
 * Send auto-reply email after contact form submission.
 */
async function sendContactReply(contactMsg) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return
  const html = `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: #FFC107; padding: 24px; text-align: center;">
        <h1 style="margin:0; color:#000; font-size:28px; font-weight:900; letter-spacing:2px;">GOLDEN HANDS</h1>
        <p style="margin:4px 0 0; color:#000;">Driving School — We Received Your Message</p>
      </div>
      <div style="padding: 32px;">
        <h2 style="color: #FFC107;">Thank you for reaching out, ${contactMsg.name}!</h2>
        <p style="color:#ccc;">We have received your message and will get back to you within <strong style="color:#fff">24 hours</strong>.</p>
        <div style="background:#1a1a1a; border-radius:8px; padding:20px; margin:20px 0; border-left: 4px solid #FFC107;">
          <p><strong style="color:#FFC107">Subject:</strong> <span style="color:#fff">${contactMsg.subject}</span></p>
          <p><strong style="color:#FFC107">Your Message:</strong></p>
          <p style="color:#ccc; font-style:italic;">"${contactMsg.message}"</p>
        </div>
        <p style="color:#ccc;">Can't wait? Call us directly: <a href="tel:+919040040165" style="color:#FFC107;">+91 9040040165</a></p>
      </div>
      <div style="background:#000; padding:16px; text-align:center; color:#666; font-size:12px;">
        &copy; 2024 ${SCHOOL_NAME} | Bhubaneswar, Odisha
      </div>
    </div>
  `
  // Send to user
  await transporter.sendMail({
    from: FROM,
    to: contactMsg.email,
    subject: `Thank you for contacting ${SCHOOL_NAME}!`,
    html,
  })
  // Notify school admin
  if (process.env.EMAIL_USER) {
    await transporter.sendMail({
      from: FROM,
      to: process.env.EMAIL_USER,
      subject: `📩 New Contact Message from ${contactMsg.name}`,
      html: `<p>Name: ${contactMsg.name}</p><p>Email: ${contactMsg.email}</p><p>Phone: ${contactMsg.phone}</p><p>Subject: ${contactMsg.subject}</p><p>Message: ${contactMsg.message}</p>`,
    })
  }
}

/**
 * Send welcome email to a new user.
 */
async function sendWelcomeEmail(user) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return
  const html = `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: #FFC107; padding: 24px; text-align: center;">
        <h1 style="margin:0; color:#000; font-size:28px; font-weight:900; letter-spacing:2px;">GOLDEN HANDS</h1>
      </div>
      <div style="padding: 32px;">
        <h2 style="color: #FFC107;">Welcome to Golden Hands, ${user.name}!</h2>
        <p style="color:#ccc; line-height: 1.6;">Thank you for registering with us. We are thrilled to have you here.</p>
        <p style="color:#ccc; line-height: 1.6;">You can now log in to your account to book driving lessons, track your progress, and download your certificate upon completion.</p>
        <div style="background:#1a1a1a; border-radius:8px; padding:20px; margin:20px 0; border-left: 4px solid #FFC107;">
          <p><strong style="color:#FFC107">Your Email:</strong> <span style="color:#fff">${user.email}</span></p>
        </div>
      </div>
      <div style="background:#000; padding:16px; text-align:center; color:#666; font-size:12px;">
        &copy; 2024 ${SCHOOL_NAME} | Bhubaneswar, Odisha
      </div>
    </div>
  `
  await transporter.sendMail({
    from: FROM,
    to: user.email,
    subject: `Welcome to ${SCHOOL_NAME}!`,
    html,
  })
}

/**
 * Send payment receipt.
 */
async function sendPaymentReceipt(booking, paymentAmount, userEmail, paymentId) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return
  const html = `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: #FFC107; padding: 24px; text-align: center;">
        <h1 style="margin:0; color:#000; font-size:28px; font-weight:900; letter-spacing:2px;">GOLDEN HANDS</h1>
        <p style="margin:4px 0 0; color:#000;">Payment Receipt</p>
      </div>
      <div style="padding: 32px;">
        <h2 style="color: #FFC107;">Payment Successful!</h2>
        <p style="color:#ccc;">Hi <strong style="color:#fff">${booking.name}</strong>, we have received your payment of <strong style="color:#FFC107">Rs ${paymentAmount}</strong>.</p>
        <div style="background:#1a1a1a; border-radius:8px; padding:20px; margin:20px 0; border-left: 4px solid #FFC107;">
          <p><strong style="color:#FFC107">Service:</strong> <span style="color:#fff">${booking.service}</span></p>
          <p><strong style="color:#FFC107">Payment ID:</strong> <span style="color:#fff">${paymentId}</span></p>
        </div>
        <p style="color:#ccc;">Thank you for choosing Golden Hands Driving School.</p>
      </div>
      <div style="background:#000; padding:16px; text-align:center; color:#666; font-size:12px;">
        &copy; 2024 ${SCHOOL_NAME} | Bhubaneswar, Odisha
      </div>
    </div>
  `
  await transporter.sendMail({
    from: FROM,
    to: userEmail,
    subject: `Payment Receipt — ${SCHOOL_NAME}`,
    html,
  })
}

module.exports = { sendBookingConfirmation, sendContactReply, sendWelcomeEmail, sendPaymentReceipt }
