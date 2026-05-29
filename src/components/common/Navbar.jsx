"use client";

import Image from "next/image";
import Link from "next/link";
import useNavbar from "@/lib/hooks/useNavbar";
import { BRAND, NAV_LINKS, NAV_CTA } from "@/lib/config/site.config";

export default function Navbar() {
  const { isOpen, toggleMenu, closeMenu } = useNavbar();

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Navbar Row */}
        <div className="flex h-14 sm:h-16 lg:h-20 items-center justify-between">
          {/* ================= LOGO ================= */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            {/* Logo Image */}
            <div className="relative h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12">
              <Image
                src={BRAND.logo}
                alt={`${BRAND.name} Logo`}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Logo Text */}
            <div className="flex flex-col leading-tight">
              <span className="text-sm sm:text-base lg:text-lg font-bold tracking-wide text-slate-900">
                {BRAND.shortName}
              </span>
              <span className="hidden sm:block text-[9px] sm:text-[10px] lg:text-xs font-semibold tracking-widest uppercase text-brand-accentDark">
                {BRAND.tagline}
              </span>
            </div>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-sm lg:text-base font-medium text-slate-700 hover:text-brand-primary transition duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ================= DESKTOP CTA ================= */}
          <div className="hidden md:block">
            <Link
              href={NAV_CTA.href}
              className="rounded-md border border-brand-primary px-4 lg:px-6 py-2 text-sm lg:text-base font-semibold text-brand-primary hover:bg-brand-primary hover:text-white transition duration-300"
            >
              {NAV_CTA.label}
            </Link>
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center gap-1.5 p-2"
            aria-label="Toggle Menu"
          >
            <span
              className={`h-[2px] w-6 bg-slate-800 transition-all ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-[2px] w-6 bg-slate-800 transition-all ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-6 bg-slate-800 transition-all ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-slate-200 px-6 py-6 space-y-6 shadow-lg">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className="block text-base font-medium text-slate-800 hover:text-brand-primary transition"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href={NAV_CTA.href}
            onClick={closeMenu}
            className="block w-full rounded-md border border-brand-primary py-3 text-center text-base font-semibold text-brand-primary hover:bg-brand-primary hover:text-white transition"
          >
            {NAV_CTA.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
