import Image from "next/image";
import { BRAND } from "@/lib/config/site.config";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-5 bg-[#FFFBF0] z-50">
      <div className="relative h-14 w-14">
        <div
          className="absolute inset-0 rounded-full border-2 animate-spin"
          style={{ borderColor: "rgba(217,119,6,0.15)", borderTopColor: "#d97706" }}
        />
        <div className="absolute inset-2 rounded-lg overflow-hidden">
          <Image src={BRAND.logo} alt={`${BRAND.name} logo`} fill className="object-contain" />
        </div>
      </div>
      <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-600">Loading...</p>
    </div>
  );
}
