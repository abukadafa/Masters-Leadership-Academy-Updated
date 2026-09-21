import React from "react";

/**
 * Floating WhatsApp contact button.
 *
 * No WhatsApp Business number was included in the registration certificate, so this is not
 * wired to a real number — that would mean shipping a broken or misleading contact link.
 * Set NEXT_PUBLIC_WHATSAPP_NUMBER (E.164 format, digits only, e.g. 2348012345678) once the
 * Academy supplies one, and this button will go live automatically.
 */
export default function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  if (!number) {
    // Architecture is ready; nothing renders until a real number is supplied.
    return null;
  }

  const href = `https://wa.me/${number}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-fab fixed z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.004 2.003c-5.523 0-10 4.477-10 10 0 1.766.463 3.492 1.343 5.008L2 22l5.13-1.335A9.96 9.96 0 0 0 12.004 22c5.523 0 10-4.477 10-10s-4.477-9.997-10-9.997zm0 18.16a8.14 8.14 0 0 1-4.15-1.14l-.298-.177-3.043.792.813-2.966-.194-.305a8.15 8.15 0 0 1-1.253-4.35c0-4.505 3.667-8.172 8.172-8.172 4.505 0 8.172 3.667 8.172 8.172-.001 4.505-3.667 8.146-8.219 8.146z" />
      </svg>
    </a>
  );
}
