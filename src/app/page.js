import dynamic from "next/dynamic";
import Hero       from "@/components/sections/home/Hero";
import WhatWeDo   from "@/components/sections/home/WhatWeDo";
import StatsStrip from "@/components/sections/home/StatsStrip";
import WhyChooseUs from "@/components/sections/home/WhyChooseUs";
import FinalCTA   from "@/components/sections/home/FinalCTA";

const Industries   = dynamic(() => import("@/components/sections/home/Industries"),   { ssr: false });
const Testimonials = dynamic(() => import("@/components/sections/home/Testimonials"), { ssr: false });
const EVMapSection = dynamic(() => import("@/components/sections/home/EVMapSection"), { ssr: false });

export default function Page() {
  return (
    <div className="w-full bg-brand-bg antialiased text-brand-ink">
      <Hero />
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
