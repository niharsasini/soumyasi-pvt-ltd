import Hero from "@/components/sections/Hero";
import Industries from "@/components/sections/Industries";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonial from "@/components/sections/Testimonial";

export default function Page() {
  return (
    <main role="main" className="w-full overflow-x-hidden bg-white antialiased">
      {/* HERO / VALUE PROPOSITION */}
      <Hero />

      {/* INDUSTRIES WE SERVE */}
      <Industries />

      {/* WHY CHOOSE US */}
      <WhyChooseUs />

      {/* TRUST & SOCIAL PROOF */}
      <Testimonial />
    </main>
  );
}
