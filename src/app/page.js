import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import StatsStrip from "@/components/sections/StatsStrip";
import Industries from "@/components/sections/Industries";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonial from "@/components/sections/Testimonial";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Page() {
  return (
    <main className="w-full overflow-x-hidden bg-[#0f172a] antialiased">
      <Hero />
      <WhatWeDo />
      <StatsStrip />
      <Industries />
      <WhyChooseUs />
      <Testimonial />
      <FinalCTA />
    </main>
  );
}
