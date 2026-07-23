# EmailJS Setup — Contact Form

The portfolio contact form is wired to send messages via **EmailJS** (client-side, no backend). Follow the six steps below to activate it.

---

## 1. Create an EmailJS account

Sign up at <https://dashboard.emailjs.com/admin> (free tier is enough for a personal portfolio: 200 emails/month).

## 2. Add a Gmail service

- Go to **Email Services → Add New Service**.
- Choose **Gmail** and connect the mailbox you want messages delivered to (e.g. `abhibabariya007@gmail.com`).
- Copy the generated **Service ID** (looks like `service_xxxxxxx`).

## 3. Create an email template

- Go to **Email Templates → Create New Template**.
- Set the **Subject** to something like: `Portfolio contact — {{from_name}}`.
- Set the **Content** body to include these template variables:

```
From: {{from_name}} <{{from_email}}>
Submitted: {{submitted_at}}

{{message}}

—
Browser: {{browser}}
Device:  {{device}}
Timezone: {{tz}}
User-Agent: {{user_agent}}
```

- Copy the generated **Template ID** (`template_xxxxxxx`).

## 4. Grab your public key

- Go to **Account → General → API Keys**.
- Copy the **Public Key**.

## 5. Paste all three into `js/emailjs-config.js`

Open `js/emailjs-config.js` and replace the three `YOUR_*` placeholders:

```js
window.EMAILJS_CFG = {
  serviceId: 'service_xxxxxxx',
  templateId: 'template_xxxxxxx',
  publicKey: 'PUBLIC_KEY_HERE'
};
```

Once real values are pasted, the amber "setup mode" banner above the contact form disappears automatically.

## 6. Lock down the origin allowlist

- Go to **Account → Security → Allowed Origins**.
- Add: `https://abhiiibabariya-dev.github.io` (and `http://localhost` if you develop locally).
- This prevents anyone from harvesting your public key and abusing your quota from a different domain.

---

## Notes

- The public key is **designed to be public** — it identifies your EmailJS account, not authorizes it. Security comes from the origin allowlist + rate limits above.
- The form already applies client-side hardening: honeypot field, 30-second cooldown, minimum 3-second typing time, and input validation.
- Monitor sends and quota in the **Email History** panel of the dashboard.
