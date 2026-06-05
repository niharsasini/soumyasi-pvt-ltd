import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { SOLUTIONS } from "@/lib/data/solutions";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const solution = SOLUTIONS.find((s) => s.slug === params.slug);
  if (!solution) return {};
  return {
    title: `${solution.title} | Soumyasi Power`,
    description: solution.description,
  };
}

export default function SolutionDetailPage({ params }) {
  const solution = SOLUTIONS.find((s) => s.slug === params.slug);
  if (!solution) redirect("/solutions");

  const Icon = solution.icon;

  return (
    <div className="bg-[#FFFBF0] text-[#1a1208] overflow-hidden">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden bg-[#FFFBF0]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[8%] left-[4%] h-80 w-80 rounded-full bg-amber-400/25 blur-3xl" />
          <div className="absolute bottom-[10%] right-[6%] h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 mb-6">
            <Icon size={32} className="text-[#d97706]" />
          </div>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#d97706] mb-4">
            Our Solutions
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-[#1a1208] leading-tight mb-6">
            {solution.title}
          </h1>
          <p className="text-[#78614a] text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            {solution.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-[0_4px_15px_rgba(217,119,6,0.3)] hover:scale-105 transition-all duration-300"
            >
              Get Free Assessment <ArrowRight size={15} />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-amber-400 text-amber-700 font-semibold text-sm hover:bg-amber-50 transition-all duration-300"
            >
              All Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-[#FFF8E7]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#d97706] mb-4 text-center">
            What&apos;s Included
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1a1208] text-center mb-12">
            Key Features &amp; Capabilities
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {solution.features.map((feat) => (
              <div
                key={feat}
                className="flex items-start gap-3 bg-white rounded-2xl border border-[#e8d5b0] p-5"
                style={{ boxShadow: "0 4px 24px rgba(120,80,20,0.08)" }}
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mt-0.5">
                  <CheckCircle size={11} className="text-white" strokeWidth={2.5} />
                </span>
                <span className="text-[#1a1208] text-sm leading-relaxed">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-amber-600 to-amber-800 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-200 mb-4">Get Started</p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-5">
            Ready to Get Started?
          </h2>
          <p className="text-amber-100 text-lg mb-10 leading-relaxed">
            Our team will design the right solution for your specific needs. Free site assessment, no obligation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold text-base text-amber-700 bg-white hover:bg-amber-50 hover:scale-105 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
          >
            Request Free Assessment <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
