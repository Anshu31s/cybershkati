import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const RECIPIENT = 'info@cybershaktifoundation.org';

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    return NextResponse.json({ success: false, error: 'Contact messages are temporarily unavailable. Please email info@cybershaktifoundation.org directly.' }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return NextResponse.json({ success: false, error: 'Invalid form submission.' }, { status: 400 });
  // Silently accept bot honeypot submissions without sending them.
  if (typeof body.website === 'string' && body.website.trim()) return NextResponse.json({ success: true });

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim().replace(/[\r\n]+/g, ' ') : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!name || name.length > 100 || !email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    || !subject || subject.length > 160 || message.length < 10 || message.length > 5000) {
    return NextResponse.json({ success: false, error: 'Please provide a valid name, email, subject, and message (10–5000 characters).' }, { status: 400 });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [RECIPIENT],
        reply_to: email,
        subject: `[Website contact] ${subject}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#172033;line-height:1.6"><p style="color:#0e7490;font-weight:700">CYBER SHAKTI FOUNDATION · WEBSITE CONTACT</p><h2>${safeSubject}</h2><p><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p><hr style="border:0;border-top:1px solid #dbe4ee;margin:24px 0"><p>${safeMessage}</p></div>`,
        text: `Website contact message\n\nSubject: ${subject}\nFrom: ${name} <${email}>\n\n${message}`,
      }),
    });
    if (!response.ok) {
      const details = await response.json().catch(() => ({}));
      console.error('Resend contact email error:', details);
      return NextResponse.json({ success: false, error: 'We could not send your message right now. Please email info@cybershaktifoundation.org directly.' }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact email request failed:', error);
    return NextResponse.json({ success: false, error: 'We could not send your message right now. Please email info@cybershaktifoundation.org directly.' }, { status: 502 });
  }
}
