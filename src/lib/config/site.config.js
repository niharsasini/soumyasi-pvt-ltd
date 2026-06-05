/**
 * Single source of truth for site-wide brand, contact, social, and nav data.
 * Consumed by Navbar, Footer, layout metadata, contact page, etc.
 */

export const BRAND = {
  name: "Soumyashi Power Limited",
  shortName: "SOUMYASI POWER",
  tagline: "Electrical & Power Solutions",
  description:
    "Delivering innovative and sustainable power solutions with excellence, reliability, and cutting-edge technology across industries.",
  logo: "/soumyasi/soumyasi.jpeg",
};

export const CONTACT = {
  email: "info@soumyasipower.com",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  address: {
    line1: "Plot No. 123, Industrial Area,",
    line2: "Bhubaneswar, Odisha, India",
  },
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
