import "./globals.css";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import CustomCursor from "@/components/common/CustomCursor";
import FloatingActions from "@/components/ui/FloatingActions";
import BackToTop from "@/components/ui/BackToTop";
import CookieConsent from "@/components/ui/CookieConsent";
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
  title: {
    default: "Soumyashi Power | Solar & EV Charging Odisha",
    template: "%s | Soumyashi Power",
  },
  description:
    "Odisha's leading solar panel installation and EV charging network. 500+ installations, 50+ stations across 15+ cities.",
  keywords: [
    "solar panels Odisha",
    "EV charging Bhubaneswar",
    "solar installation Odisha",
    "EV charging station Odisha",
    "Soumyashi Power",
  ],
  authors: [{ name: "Soumyashi Power" }],
  creator: "Soumyashi Power",
  metadataBase: new URL("https://soumyasipower.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://soumyasipower.com",
    siteName: "Soumyashi Power",
    title: "Soumyashi Power | Solar & EV Charging Odisha",
    description:
      "Odisha's leading solar panel installation and EV charging network.",
    images: [
      {
        url: "/soumyasi/solar-field-odisha.png",
        width: 1200,
        height: 630,
        alt: "Soumyashi Power Solar Installation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soumyashi Power | Solar & EV Charging Odisha",
    description:
      "Odisha's leading solar panel installation and EV charging network.",
    images: ["/soumyasi/solar-field-odisha.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col bg-brand-bg text-brand-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-amber-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
        >
          Skip to main content
        </a>
        <CustomCursor />
        <Navbar />
        <main id="main-content" className="flex-grow">{children}</main>
        <Footer />
        <FloatingActions />
        <BackToTop />
        <CookieConsent />
      </body>
    </html>
  );
}
