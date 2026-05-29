import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us | Soumayashree",
  description:
    "Soumayashree delivers innovative, high-performance solutions across industries with excellence, strategy, and technology.",
};

const values = [
  {
    title: "Innovation",
    desc: "We embrace modern technologies and creative thinking to build future-ready solutions.",
  },
  {
    title: "Integrity",
    desc: "Transparency, honesty, and accountability are at the core of our culture.",
  },
  {
    title: "Excellence",
    desc: "We deliver measurable impact with precision, quality, and commitment.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-32">
        <div className="container mx-auto px-6 lg:px-16 text-center max-w-5xl">
          <span className="text-sm uppercase tracking-widest text-blue-400 font-semibold">
            About Soumayashree
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
            Empowering Businesses
            <br />
            Through Innovation & Strategy
          </h1>

          <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We design and deliver scalable, high-performance solutions that
            accelerate growth, enhance operational efficiency, and create
            long-term value.
          </p>

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-8 py-3 rounded-lg font-semibold shadow-lg"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="py-28">
        <div className="container mx-auto px-6 lg:px-16 grid lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/about-image.jpg"
              alt="Soumayashree Company"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Who We Are</h2>

            <div className="w-20 h-1 bg-blue-600 rounded"></div>

            <p className="text-gray-600 text-lg leading-relaxed">
              Soumayashree is a forward-thinking organization committed to
              delivering high-impact solutions across industries. Our team
              integrates business strategy with advanced technology to produce
              measurable, sustainable results.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              We believe in long-term partnerships built on trust, innovation,
              and operational excellence. Our mission is to empower businesses
              to adapt, evolve, and lead confidently in competitive markets.
            </p>
          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="py-28 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-16 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold">Mission & Vision</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-16 mt-16 grid md:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <h3 className="text-2xl font-semibold text-blue-700 mb-6">
              Our Mission
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              To deliver innovative and transformative solutions that improve
              efficiency, drive digital transformation, and create sustainable
              competitive advantages for our clients.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-6">
              Our Vision
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              To become a globally trusted brand recognized for innovation,
              reliability, and delivering world-class solutions with integrity
              and excellence.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-28">
        <div className="container mx-auto px-6 lg:px-16 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-16 mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-10 rounded-2xl border border-gray-200 bg-white hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white py-28 text-center">
        <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Let’s Build the Future Together
          </h2>

          <p className="text-gray-300 text-lg mb-10">
            Collaborate with us to unlock innovation, accelerate growth, and
            create sustainable success.
          </p>

          <Link
            href="/contact"
            className="inline-block bg-white text-blue-900 font-semibold px-10 py-4 rounded-lg hover:bg-gray-200 transition shadow-lg"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
