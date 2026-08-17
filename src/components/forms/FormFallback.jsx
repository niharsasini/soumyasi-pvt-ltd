import { Phone, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/config/site.config";

export const FORM_ERROR_MESSAGE = `Message could not be sent. Please call us directly at ${CONTACT.phone} or WhatsApp us.`;

export default function FormFallback({ className = "" }) {
  const waHref = CONTACT.whatsapp;
  return (
    <p className={`text-xs text-brand-muted flex flex-wrap items-center gap-x-4 gap-y-1.5 ${className}`}>
      <span>Or reach us directly:</span>
      <a href={CONTACT.phoneHref} className="inline-flex items-center gap-1 text-brand-gold hover:text-amber-700 font-semibold transition-colors">
        <Phone size={12} /> {CONTACT.phone}
      </a>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
      >
        <MessageCircle size={12} /> WhatsApp
      </a>
    </p>
  );
}
