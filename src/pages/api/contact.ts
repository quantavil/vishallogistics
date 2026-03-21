export const prerender = false;

import type { APIRoute } from 'astro';
import { EmailMessage } from 'cloudflare:email';
import { createMimeMessage } from 'mimetext';

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const data = await request.formData();
  
  const name = data.get('name')?.toString() || 'Unknown';
  const email = data.get('email')?.toString() || 'Unknown';
  const phone = data.get('phone')?.toString() || 'Not provided';
  const service = data.get('service')?.toString() || 'Not selected';
  const messageStr = data.get('message')?.toString() || 'No message';
  const honey = data.get('_honey')?.toString();

  // Basic honeypot check (hidden field)
  if (honey) {
    return new Response('Spam detected', { status: 400 });
  }

  // The binding name inside Cloudflare must be SEB (Send Email Binding)
  const env = (locals as any).runtime?.env;
  if (!env || !env.SEB) {
    console.error("Missing Cloudflare 'SEB' email binding. Ensure you added it in the Cloudflare Dashboard under Pages -> Settings -> Functions -> Send Email bindings.");
    return new Response('Server Configuration Error: Missing SEB binding', { status: 500 });
  }

  // The verified email address in Cloudflare Email Routing
  const destinationEmail = env.DESTINATION_EMAIL || 'info@vishallogistics.in';
  
  try {
    const msg = createMimeMessage();
    msg.setSender({ name: "Website Quote Request", addr: destinationEmail });
    msg.setRecipient(destinationEmail); 
    msg.setHeader("Reply-To", email);
    msg.setSubject(`[Website] New request from ${name} - ${service}`);
    
    msg.addMessage({
      contentType: 'text/html',
      data: `
        <h2>New Quote Request via Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Needed:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${messageStr.replace(/\n/g, '<br>')}</p>
      `
    });

    const emailMessage = new EmailMessage(
      destinationEmail,
      destinationEmail,
      msg.asRaw()
    );

    // This native method sends the email instantly and completely free
    await env.SEB.send(emailMessage);
    
    return redirect('/contact?sent=true');
  } catch (error: any) {
    console.error('Failed to send email:', error);
    return new Response(`Failed to send email: ${error.message || 'Unknown error'}`, { status: 500 });
  }
};
