import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { rating, comment, email, name } = await request.json();

    if (!email || !rating) {
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
        secure: port === 465,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      transportType = "SMTP Server";
    } else {
      // stream transport
      transporter = nodemailer.createTransport({
        streamTransport: true,
        newline: "unix",
        buffer: true
      });
      transportType = "Development Console";
    }

    const ratingStars = "★".repeat(rating) + "☆".repeat(5 - rating);

    const logo = "COACH ME CRM";
    const subject = `Thank you for your feedback! - Coach Me CRM`;
    const htmlContent = `
      <div style="background-color: #0c0f14; color: #ffffff; padding: 40px 20px; font-family: sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #01F5A0; font-size: 28px; margin: 0;">${logo}</h1>
          <p style="color: #8892b0; font-size: 14px; margin-top: 5px;">High-Performance Executive Coaching</p>
        </div>
        <div style="background: rgba(255,255,255,0.02); padding: 30px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
          <h2 style="color: #ffffff; font-size: 20px; margin-top: 0;">Thank you, ${name || "valued user"}!</h2>
          <p style="color: #a8b2d1; font-size: 15px; line-height: 1.6;">
            We received your feedback regarding the Coach Me CRM Dashboard and want to express our appreciation for your time. Your input is critical to refining our executive performance analytics platform.
          </p>
          
          <div style="background-color: rgba(255,255,255,0.03); border-left: 4px solid #01F5A0; padding: 15px; margin: 25px 0; border-radius: 4px;">
            <p style="margin: 0 0 5px 0; font-size: 13px; color: #8892b0; text-transform: uppercase; tracking-widest;">Your Rating</p>
            <p style="margin: 0 0 15px 0; font-size: 20px; color: #01F5A0; font-weight: bold;">${ratingStars} (${rating}/5)</p>
            <p style="margin: 0; font-size: 14px; color: #e2e8f0; font-style: italic;">
              "${comment || "No comment provided."}"
            </p>
          </div>
          
          <p style="color: #a8b2d1; font-size: 15px; line-height: 1.6;">
            Our development team reviews all feedback tickets to identify features and platform optimizations.
          </p>
          <div style="margin: 30px 0; text-align: center;">
            <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard" style="background-color: #01F5A0; color: #0a0c10; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px; display: inline-block;">Return to Dashboard</a>
          </div>
          <p style="color: #8892b0; font-size: 13px; margin-bottom: 0;">
            This is an automated reply confirming your submission. Thank you for helping us design the elite CRM experience.
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Coach Me CRM" <noreply@coachme.com>',
      to: email,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    if (transportType === "Development Console") {
      console.log("\n==================================================");
      console.log(`[DEV MODE] THANK YOU EMAIL OUTBOX LOG`);
      console.log(`To: ${email}`);
      console.log(`Subject: ${subject}`);
      console.log(`Rating: ${rating}/5`);
      console.log(`Comment: ${comment}`);
      console.log(`Transport: Log Stream`);
      console.log("==================================================\n");
    }

    return NextResponse.json({
      success: true,
      transport: transportType,
      email,
      rating,
      comment
    });
  } catch (error: any) {
    console.error("Failed to send feedback thank-you email:", error);
    return NextResponse.json({ error: error.message || "Failed to submit feedback" }, { status: 500 });
  }
}
