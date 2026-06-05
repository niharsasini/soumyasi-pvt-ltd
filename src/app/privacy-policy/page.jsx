import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Soumyasi Power",
  description: "Privacy policy for Soumyasi Power — how we collect, use, and protect your personal data.",
};

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: `When you use our website or contact us, we may collect the following information:
• Name, email address, and phone number submitted via contact forms
• Company name and project details provided in inquiries
• Technical data such as IP address, browser type, and pages visited (via analytics)
• Cookie data for website functionality and analytics`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:
• Respond to your inquiries and provide site assessments
• Send project proposals, quotations, and service updates
• Improve our website and services based on usage patterns
• Comply with legal obligations under applicable Indian law`,
  },
  {
    title: "3. Data Sharing",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your data with:
• Trusted service partners who assist in project delivery (under confidentiality agreements)
• Government or regulatory bodies when required by law
• Our accounting and CRM tools used for business operations`,
  },
  {
    title: "4. Cookies",
    content: `Our website uses cookies to enhance your browsing experience. Cookies help us understand how visitors use our site. You may disable cookies in your browser settings, though some website features may not function properly.`,
  },
  {
    title: "5. Data Security",
    content: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure.`,
  },
  {
    title: "6. Your Rights",
    content: `Under applicable Indian data protection law, you have the right to:
• Access the personal data we hold about you
• Request correction of inaccurate data
• Request deletion of your data (subject to legal obligations)
• Withdraw consent for marketing communications at any time`,
  },
  {
    title: "7. Contact & Grievance",
    content: `For privacy-related queries or to exercise your rights, contact us at info@soumyashreepower.com or write to: Soumyashree Power Limited, Plot No. 123, Industrial Area, Bhubaneswar, Odisha, India.`,
  },
  {
    title: "8. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. The current version will always be available on this page. Continued use of our website after changes constitutes acceptance of the updated policy.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FFFBF0] min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(217,119,6,0.06), transparent)" }} />
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#d97706] mb-4">Legal</p>
        <h1 className="text-4xl sm:text-5xl font-bold font-display text-[#1a1208] leading-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-[#78614a] text-lg max-w-xl mx-auto">
          Last updated: June 2026
        </p>
      </section>

      {/* Content */}
      <section className="pb-24 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm text-[#78614a] leading-relaxed">
            Soumyashree Power Limited (&quot;Soumyasi Power&quot;, &quot;we&quot;, &quot;our&quot;) is committed to protecting your personal data and respecting your privacy. This policy explains how we collect, use, and protect information when you interact with our website or services.
          </div>

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
