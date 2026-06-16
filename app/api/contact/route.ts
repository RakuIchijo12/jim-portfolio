import nodemailer from "nodemailer";

export const runtime = "nodejs";

const toEmail = process.env.CONTACT_TO_EMAIL ?? "rjimueldave12@gmail.com";
const fromName = process.env.CONTACT_FROM_NAME ?? "Jimuel Portfolio";

type ContactPayload = {
  body?: unknown;
  email?: unknown;
  name?: unknown;
};

function isText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getGmailTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    auth: {
      pass,
      user,
    },
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
  });
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (!isText(payload.name) || !isText(payload.email) || !isText(payload.body)) {
    return Response.json(
      { message: "Name, email, and message body are required." },
      { status: 400 },
    );
  }

  const name = payload.name.trim().slice(0, 120);
  const email = payload.email.trim().slice(0, 254);
  const body = payload.body.trim().slice(0, 4000);

  if (!isEmail(email)) {
    return Response.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const transporter = getGmailTransport();

  if (!transporter) {
    return Response.json(
      { message: "Gmail sending is not configured yet." },
      { status: 500 },
    );
  }

  const escapedBody = escapeHtml(body).replace(/\n/g, "<br />");
  const text = [
    "A new message was sent from your portfolio contact form.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    body,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: {
        address: process.env.GMAIL_USER ?? toEmail,
        name: fromName,
      },
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <p style="margin: 0 0 16px;">A new message was sent from your portfolio contact form.</p>
          <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p style="margin: 16px 0 8px;"><strong>Message:</strong></p>
          <div style="white-space: normal;">${escapedBody}</div>
        </div>
      `,
      replyTo: {
        address: email,
        name,
      },
      subject: `Portfolio inquiry from ${name}`,
      text,
      to: toEmail,
    });
  } catch (error) {
    console.error("Contact email failed:", error);

    return Response.json(
      { message: "Email could not be sent right now." },
      { status: 502 },
    );
  }

  return Response.json({ message: "Message sent to Gmail." });
}
