"use client";

import { useEffect, useRef } from "react";
import { EV_STATIONS } from "@/lib/data/ev-stations";

export default function EVStationMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mapInstanceRef.current) return;

    const initMap = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: [20.9517, 85.0985],
        zoom: 7,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      mapInstanceRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "© OpenStreetMap contributors © CARTO",
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      EV_STATIONS.forEach((station) => {
        const color = station.status === "Active" ? "#f59e0b" : "#6b7280";
        const circle = L.circleMarker([station.lat, station.lng], {
          radius: 8,
          fillColor: color,
          color: color,
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8,
        }).addTo(map);

        circle.bindPopup(
          `<div style="background:#111827;color:#f9fafb;padding:12px;border-radius:8px;min-width:180px;border:1px solid #f59e0b33">
            <div style="font-weight:700;color:#f59e0b;margin-bottom:6px">${station.name}</div>
            <div style="font-size:12px;color:#9ca3af">${station.city}, Odisha</div>
            <div style="margin-top:8px;font-size:12px">
              <span style="background:#1f2937;padding:2px 8px;border-radius:4px;margin-right:4px">${station.chargerType}</span>
              <span style="background:#1f2937;padding:2px 8px;border-radius:4px">${station.power}</span>
            </div>
            <div style="margin-top:6px;font-size:12px;color:${station.status === "Active" ? "#10b981" : "#6b7280"}">${station.status}</div>
          </div>`,
          { className: "dark-popup" }
        );
      });
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ height: "clamp(350px, 50vw, 500px)", width: "100%", borderRadius: "12px" }}
      className="border border-amber-500/20"
    />
  );
}
