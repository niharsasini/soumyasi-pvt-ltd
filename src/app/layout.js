import "./globals.css";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import CustomCursor from "@/components/common/CustomCursor";
import FloatingActions from "@/components/ui/FloatingActions";
import BackToTop from "@/components/ui/BackToTop";
import { BRAND } from "@/lib/config/site.config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: `${BRAND.name} — Solar, EV Charging & Power Solutions | Odisha`,
  description: BRAND.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col bg-brand-bg text-brand-ink antialiased">
        <CustomCursor />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingActions />
        <BackToTop />
      </body>
    </html>
  );
}
