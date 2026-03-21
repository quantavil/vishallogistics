export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { EmailMessage } from 'cloudflare:email';

function buildMimeEmail({ from, to, replyTo, subject, html }: {
  from: string; to: string; replyTo: string; subject: string; html: string;
}) {
  const boundary = `boundary_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  const messageId = `<${Date.now()}.${Math.random().toString(36).substring(2)}@vishallogistics.in>`;
  const dateStr = new Date().toUTCString();

  return [
    `Message-ID: ${messageId}`,
    `Date: ${dateStr}`,
    `From: Website Quote Request <${from}>`,
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset=utf-8`,
    `Content-Transfer-Encoding: quoted-printable`,
    ``,
    html,
    `--${boundary}--`,
  ].join('\r\n');
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();

  const name = data.get('name')?.toString() || 'Unknown';
  const email = data.get('email')?.toString() || 'Unknown';
  const phone = data.get('phone')?.toString() || 'Not provided';
  const service = data.get('service')?.toString() || 'Not selected';
  const messageStr = data.get('message')?.toString() || 'No message';
  const honey = data.get('_honey')?.toString();

  if (honey) {
    return new Response('Spam detected', { status: 400 });
  }

  // Astro 6 / Cloudflare adapter v13: use import { env } from 'cloudflare:workers'
  const SEB = (env as any).SEB;
  const destinationEmail = (env as any).DESTINATION_EMAIL || 'info@vishallogistics.in';

  if (!SEB) {
    console.error("Missing Cloudflare 'SEB' email binding.");
    return new Response('Server Configuration Error: Missing SEB binding', { status: 500 });
  }

  try {
    const raw = buildMimeEmail({
      from: destinationEmail,
      to: destinationEmail,
      replyTo: email,
      subject: `[Website] New request from ${name} - ${service}`,
      html: `
        <h2>New Quote Request via Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Needed:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${messageStr.replace(/\n/g, '<br>')}</p>
      `,
    });

    const emailMessage = new EmailMessage(destinationEmail, destinationEmail, raw);
    await SEB.send(emailMessage);

    return redirect('/contact?sent=true');
  } catch (error: any) {
    console.error('Failed to send email:', error);
    return new Response(`Failed to send email: ${error.message || 'Unknown error'}`, { status: 500 });
  }
};

export const GET: APIRoute = async ({ redirect }) => {
  return redirect('/contact');
};