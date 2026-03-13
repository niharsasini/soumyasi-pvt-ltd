import "./globals.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer"; // ✅ Import Footer

export const metadata = {
  title: "Powring Electrical",
  description:
    "Commercial & residential electrical services — Powring Electrical",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow pt-10">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
