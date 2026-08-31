/**
 * Single source of truth for site-wide brand, contact, social, and nav data.
 * Consumed by Navbar, Footer, layout metadata, contact page, etc.
 *
 * ⚠️  Social URLs below (Facebook/LinkedIn/Twitter) are still placeholders —
 *   confirm they resolve to real, owned profiles before launch.
 */

export const BRAND = {
  name: "Soumyashi Power Limited",
  shortName: "SOUMYASHI POWER",
  tagline: "Electrical & Power Solutions",
  description:
    "Delivering innovative and sustainable power solutions with excellence, reliability, and cutting-edge technology across industries.",
  logo: "/soumyasi/soumyasi.jpeg",
  email: "soumyashipower@gmail.com",
};

export const CONTACT = {
  email: "soumyashipower@gmail.com",
  emailHref: "mailto:soumyashipower@gmail.com",
  phone: "+91 94376 11129",
  phoneHref: "tel:+919437611129",
  phone2: "7381076808",
  phone2Href: "tel:+917381076808",
  phone2Display: "+91 73810 76808",
  whatsapp: "https://wa.me/919437611129",
  address: "MIG-126, Bhimatangi Housing Colony, Bhubaneswar, Odisha 751002",
  addressShort: "Bhimatangi, Bhubaneswar, Odisha 751002",
  mapLink: "https://maps.google.com/?q=Bhimatangi+Housing+Colony+Bhubaneswar+Odisha+751002",
  hours: "Mon - Sat : 9:00 AM - 6:00 PM",
};

export const SOCIAL = {
  facebook: "https://www.facebook.com/soumyasipower",
  linkedin: "https://www.linkedin.com/company/soumyasi-power",
  twitter: "https://twitter.com/soumyasipower",
};

export const NAV_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

export const NAV_CTA = {
  label: "Contact Us",
  href: "/contact",
};

export const FOOTER_QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_SERVICES = [
  "Solar Power Solutions",
  "Electrical Infrastructure",
  "Power Distribution",
  "Energy Consulting",
  "Maintenance & Support",
];

const siteConfig = {
  brand: BRAND,
  contact: CONTACT,
  social: SOCIAL,
  navLinks: NAV_LINKS,
  navCta: NAV_CTA,
  footerQuickLinks: FOOTER_QUICK_LINKS,
  footerServices: FOOTER_SERVICES,
};

export default siteConfig;
