/* ==========================================================================
   EmailJS configuration
   --------------------------------------------------------------------------
   The publicKey below is SAFE to expose in client-side code — that's how
   EmailJS is designed. Security is enforced server-side via the dashboard:
     1. Per-service origin allowlist (Allowed Origins)
     2. Per-key rate limits + reCAPTCHA option
     3. Per-template variable whitelist

   Rotate keys, tighten allowed origins, and monitor sends here:
     https://dashboard.emailjs.com/admin

   See README-EMAILJS.md at the project root for the full setup checklist.
   ========================================================================== */
window.EMAILJS_CFG = {
  serviceId: 'service_2lowtl2',
  templateId: 'template_vrcav19',
  publicKey: 'R9-pkw_CjpX-5Zayl'
};
