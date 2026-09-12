import dynamic from "next/dynamic";
import Hero        from "@/components/sections/home/Hero";
import WhatWeDo    from "@/components/sections/home/WhatWeDo";
import StatsStrip  from "@/components/sections/home/StatsStrip";
import WhyChooseUs from "@/components/sections/home/WhyChooseUs";
import FinalCTA    from "@/components/sections/home/FinalCTA";

const Industries      = dynamic(() => import("@/components/sections/home/Industries"),      { ssr: false });
const Testimonials    = dynamic(() => import("@/components/sections/home/Testimonials"),    { ssr: false });
const Gallery         = dynamic(() => import("@/components/sections/home/Gallery"),         { ssr: false });
const EVMapSection    = dynamic(() => import("@/components/sections/home/EVMapSection"),    { ssr: false });
const EVPartnerSection = dynamic(() => import("@/components/sections/home/EVPartnerSection"), { ssr: false });

export const metadata = {
  title: "Soumyashi Power | Solar Panels, EV Charging & Industrial Power — Odisha",
  description:
    "Odisha's leading energy company. Solar installations, EV charging stations, wind power and industrial electrical infrastructure. Based in Bhubaneswar.",
  keywords: [
    "solar panels Odisha",
    "solar installation Bhubaneswar",
    "EV charging station Odisha",
    "EV charging Bhubaneswar",
    "wind power Odisha",
    "industrial power supply Odisha",
    "solar company Bhubaneswar",
    "Soumyashi Power",
    "rooftop solar Odisha",
    "fast charging station Odisha",
  ],
  openGraph: {
    title: "Soumyashi Power | Solar & EV Charging — Odisha",
    description:
      "Leading energy company in Odisha. Solar installations, EV charging network, wind power and industrial infrastructure.",
    images: ["/soumyasi/solar-field-odisha.png"],
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://www.soumyashipower.in",
  },
};

const Divider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-[#e8d5b0] to-transparent" />
);

export default function Page() {
  return (
    <div className="w-full bg-brand-bg antialiased text-brand-ink">
      <Hero />
      <Divider />
      <EVPartnerSection />
      <Divider />
      <WhatWeDo />
      <Divider />
      <StatsStrip />
      <Divider />
      <EVMapSection />
      <Divider />
      <Industries />
      <Divider />
      <WhyChooseUs />
      <Divider />
      <Testimonials />
      <Divider />
      <Gallery />
      <Divider />
      <FinalCTA />
    </div>
  );
}
