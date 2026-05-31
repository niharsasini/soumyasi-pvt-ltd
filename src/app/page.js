import Hero          from "@/components/sections/home/Hero";
import WhatWeDo      from "@/components/sections/home/WhatWeDo";
import StatsStrip    from "@/components/sections/home/StatsStrip";
import Industries    from "@/components/sections/home/Industries";
import WhyChooseUs   from "@/components/sections/home/WhyChooseUs";
import Testimonials  from "@/components/sections/home/Testimonials";
import FinalCTA      from "@/components/sections/home/FinalCTA";

export default function Page() {
  return (
    <main className="w-full overflow-x-hidden bg-brand-bg antialiased">
      <Hero />
      <WhatWeDo />
      <StatsStrip />
      <Industries />
      <WhyChooseUs />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
