import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, focus, status } = await request.json();

    if (!name || !email || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Configure transporter
    let transporter;
    let transportType = "Development Console";

    const hasSmtp = process.env.EMAIL_SERVER_HOST && 
                    process.env.EMAIL_SERVER_PASSWORD && 
                    process.env.EMAIL_SERVER_PASSWORD !== "your_gmail_app_password_here";

    if (hasSmtp) {
      const port = parseInt(process.env.EMAIL_SERVER_PORT || "587");
      transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port,
        secure: port === 465, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        tls: {
          // Do not fail on invalid/self-signed certs in dev
          rejectUnauthorized: false
        }
      });
      transportType = "SMTP Server";
    } else {
      // Dev mode: use nodemailer JSON/Stream transport to log to console
      transporter = nodemailer.createTransport({
        streamTransport: true,
        newline: "unix",
        buffer: true
      });
      transportType = "Development Console";
    }

    // Custom email templates based on status
    let subject = "";
    let htmlContent = "";

    const logo = "COACH ME CRM";
    const accentColor = status === "Active" ? "#01F5A0" : status === "Review" ? "#FF5252" : "#E9A9FF";

    if (status === "Onboarding") {
      subject = `Welcome to Coach Me CRM, ${name}!`;
      htmlContent = `
        <div style="background-color: #0c0f14; color: #ffffff; padding: 40px 20px; font-family: sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #01F5A0; font-size: 28px; margin: 0;">${logo}</h1>
            <p style="color: #8892b0; font-size: 14px; margin-top: 5px;">High-Performance Executive Coaching</p>
          </div>
          <div style="background: rgba(255,255,255,0.02); padding: 30px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
            <h2 style="color: #ffffff; font-size: 20px; margin-top: 0;">Welcome aboard, ${name}!</h2>
            <p style="color: #a8b2d1; font-size: 15px; line-height: 1.6;">
              We are excited to initialize your high-performance coaching track focused on <strong>${focus || "Executive Training"}</strong>.
            </p>
            <p style="color: #a8b2d1; font-size: 15px; line-height: 1.6;">
              Your initial status is set to <span style="color: ${accentColor}; font-weight: bold;">${status}</span>. Our onboarding team is currently preparing your diagnostics dashboard.
            </p>
            <div style="margin: 30px 0; text-align: center;">
              <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}" style="background-color: #01F5A0; color: #0a0c10; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px; display: inline-block;">Get Started</a>
            </div>
            <p style="color: #8892b0; font-size: 13px; margin-bottom: 0;">
              If you have any questions, please reply to this email. Let's build your growth trajectory.
            </p>
          </div>
        </div>
      `;
    } else if (status === "Active") {
      subject = `Weekly Performance Sync - ${name}`;
      htmlContent = `
        <div style="background-color: #0c0f14; color: #ffffff; padding: 40px 20px; font-family: sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #01F5A0; font-size: 28px; margin: 0;">${logo}</h1>
            <p style="color: #8892b0; font-size: 14px; margin-top: 5px;">High-Performance Executive Coaching</p>
          </div>
          <div style="background: rgba(255,255,255,0.02); padding: 30px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
            <h2 style="color: #ffffff; font-size: 20px; margin-top: 0;">Keep Pushing, ${name}!</h2>
            <p style="color: #a8b2d1; font-size: 15px; line-height: 1.6;">
              This is your regular synchronization notification for your active coaching track on <strong>${focus || "Executive Training"}</strong>.
            </p>
            <p style="color: #a8b2d1; font-size: 15px; line-height: 1.6;">
              Your current status is <span style="color: ${accentColor}; font-weight: bold;">${status}</span>. You are making strong progress towards your performance milestones.
            </p>
            <p style="color: #a8b2d1; font-size: 15px; line-height: 1.6;">
              Please make sure to book your weekly review sync to update your metrics.
            </p>
            <div style="margin: 30px 0; text-align: center;">
              <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard" style="background-color: #01F5A0; color: #0a0c10; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px; display: inline-block;">Go to Dashboard</a>
            </div>
          </div>
        </div>
      `;
    } else {
      // Review
      subject = `Action Required: Performance Review - ${name}`;
      htmlContent = `
        <div style="background-color: #0c0f14; color: #ffffff; padding: 40px 20px; font-family: sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #FF5252; font-size: 28px; margin: 0;">${logo}</h1>
            <p style="color: #8892b0; font-size: 14px; margin-top: 5px;">High-Performance Executive Coaching</p>
          </div>
          <div style="background: rgba(255,255,255,0.02); padding: 30px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
            <h2 style="color: #ffffff; font-size: 20px; margin-top: 0;">Schedule Needed, ${name}</h2>
            <p style="color: #a8b2d1; font-size: 15px; line-height: 1.6;">
              Your coaching program for <strong>${focus || "Executive Training"}</strong> has been flagged for <span style="color: ${accentColor}; font-weight: bold;">Review</span>.
            </p>
            <p style="color: #a8b2d1; font-size: 15px; line-height: 1.6;">
              We want to ensure you are receiving the maximum value from your program. Please schedule an evaluation call with your director.
            </p>
            <div style="margin: 30px 0; text-align: center;">
              <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard" style="background-color: #FF5252; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px; display: inline-block;">Schedule Review</a>
            </div>
          </div>
        </div>
      `;
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Coach Me CRM" <noreply@coachme.com>',
      to: email,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    if (transportType === "Development Console") {
      console.log("\n==================================================");
      console.log(`[DEV MODE] EMAIL OUTBOX LOG`);
      console.log(`To: ${email}`);
      console.log(`Subject: ${subject}`);
      console.log(`Transport: Log Stream`);
      console.log("==================================================\n");
    }

    return NextResponse.json({
      success: true,
      transport: transportType,
      subject,
      email,
      status
    });
  } catch (error: any) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}
