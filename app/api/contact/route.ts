const toEmail = process.env.CONTACT_TO_EMAIL ?? "rjimueldave12@gmail.com";
const fromEmail =
  process.env.CONTACT_FROM_EMAIL ?? "Jimuel Portfolio <onboarding@resend.dev>";

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

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return Response.json(
      { message: "Email API is not configured yet." },
      { status: 500 },
    );
  }

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

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: toEmail,
      subject: `Portfolio inquiry from ${name}`,
      text,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <p style="margin: 0 0 16px;">A new message was sent from your portfolio contact form.</p>
          <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <div style="margin-top: 16px;">${escapedBody}</div>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    return Response.json(
      { message: "Email could not be sent right now." },
      { status: 502 },
    );
  }

  return Response.json({ message: "Message sent." });
}
