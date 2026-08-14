import dynamic from "next/dynamic";
import Hero        from "@/components/sections/home/Hero";
import WhatWeDo    from "@/components/sections/home/WhatWeDo";
import StatsStrip  from "@/components/sections/home/StatsStrip";
import WhyChooseUs from "@/components/sections/home/WhyChooseUs";
import FinalCTA    from "@/components/sections/home/FinalCTA";

const Industries      = dynamic(() => import("@/components/sections/home/Industries"),      { ssr: false });
const Testimonials    = dynamic(() => import("@/components/sections/home/Testimonials"),    { ssr: false });
const EVMapSection    = dynamic(() => import("@/components/sections/home/EVMapSection"),    { ssr: false });
const EVPartnerSection = dynamic(() => import("@/components/sections/home/EVPartnerSection"), { ssr: false });

export const metadata = {
  title: "Soumyashi Power | Solar Panels & EV Charging Odisha",
  description:
    "Odisha's leading energy company. Solar rooftop installations, 60kW EV fast charging network, and industrial power solutions across 15+ cities.",
  openGraph: {
    title: "Soumyashi Power | Solar Panels & EV Charging Odisha",
    description:
      "Solar installations, EV charging network, and industrial power across Odisha.",
    images: ["/soumyasi/solar-field-odisha.png"],
  },
};

export default function Page() {
  return (
    <div className="w-full bg-brand-bg antialiased text-brand-ink">
      <Hero />
      <EVPartnerSection />
      <WhatWeDo />
      <StatsStrip />
      <EVMapSection />
      <Industries />
      <WhyChooseUs />
      <Testimonials />
      <FinalCTA />
    </div>
  );
}
