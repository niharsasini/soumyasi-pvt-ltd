import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Soumyasi Power",
  description: "Terms of service for Soumyasi Power — conditions governing use of our website and services.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using the Soumyashree Power Limited website, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of our website.`,
  },
  {
    title: "2. Our Services",
    content: `Soumyashree Power Limited provides solar energy installations, EV charging infrastructure, and industrial electrical solutions in Odisha, India. Service delivery is governed by separate project agreements and proposals issued to each client.`,
  },
  {
    title: "3. Website Use",
    content: `You may use our website for lawful purposes only. You agree not to:
• Transmit any unsolicited or unauthorised advertising or promotional material
• Attempt to gain unauthorised access to our systems
• Use the website in any way that disrupts or damages our services
• Reproduce, duplicate, or copy website content without written permission`,
  },
  {
    title: "4. Intellectual Property",
    content: `All content on this website — including text, images, graphics, logos, and the Soumyasi Power brand — is the property of Soumyashree Power Limited and protected under applicable intellectual property laws. Unauthorised use is prohibited.`,
  },
  {
    title: "5. Quotations & Project Proposals",
    content: `Information provided on this website is for general purposes only and does not constitute a binding offer or quotation. All project proposals, pricing, and technical specifications are subject to formal written agreements.`,
  },
  {
    title: "6. Limitation of Liability",
    content: `To the maximum extent permitted by law, Soumyashree Power Limited shall not be liable for any indirect, incidental, or consequential damages arising from use of this website or reliance on information provided herein.`,
  },
  {
    title: "7. Third-Party Links",
    content: `Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites. Links are provided for convenience only.`,
  },
  {
    title: "8. Governing Law",
    content: `These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bhubaneswar, Odisha.`,
  },
  {
    title: "9. Changes to These Terms",
    content: `We reserve the right to update these Terms at any time. Continued use of the website after changes constitutes acceptance of the revised Terms.`,
  },
  {
    title: "10. Contact",
    content: `For questions about these Terms, contact us at info@soumyashreepower.com or write to: Soumyashree Power Limited, Plot No. 123, Industrial Area, Bhubaneswar, Odisha, India.`,
  },
];

export default function TermsPage() {
  return (
    <div className="bg-[#FFFBF0] min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(217,119,6,0.06), transparent)" }} />
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#d97706] mb-4">Legal</p>
        <h1 className="text-4xl sm:text-5xl font-bold font-display text-[#1a1208] leading-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-[#78614a] text-lg max-w-xl mx-auto">
          Last updated: June 2026
        </p>
      </section>

      {/* Content */}
      <section className="pb-24 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {SECTIONS.map(({ title, content }) => (
            <div key={title} className="bg-white rounded-2xl border border-[#e8d5b0] p-7"
              style={{ boxShadow: "0 4px 24px rgba(120,80,20,0.08)" }}>
              <h2 className="text-lg font-bold font-display text-[#1a1208] mb-3">{title}</h2>
              <p className="text-[#78614a] text-sm leading-relaxed whitespace-pre-line">{content}</p>
            </div>
          ))}

          <div className="text-center pt-4">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-[0_4px_15px_rgba(217,119,6,0.3)] hover:scale-105 transition-all duration-300">
              Contact Us with Questions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
