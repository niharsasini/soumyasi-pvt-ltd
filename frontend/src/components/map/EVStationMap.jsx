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
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "© OpenStreetMap contributors © CARTO",
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      EV_STATIONS.forEach((station) => {
        const isActive = station.status === "Active";
        const fillColor = isActive ? "#f59e0b" : "#94a3b8";
        const circle = L.circleMarker([station.lat, station.lng], {
          radius: 9,
          fillColor,
          color: "#ffffff",
          weight: 2.5,
          opacity: 1,
          fillOpacity: 0.9,
        }).addTo(map);

        circle.bindPopup(
          `<div style="background:#ffffff;color:#111827;padding:14px 16px;border-radius:12px;min-width:200px;border:1px solid #e5e7eb;box-shadow:0 4px 24px rgba(0,0,0,0.12)">
            <div style="font-weight:700;color:#f59e0b;margin-bottom:5px;font-size:14px">${station.name}</div>
            <div style="font-size:12px;color:#6b7280">${station.city}, Odisha</div>
            <div style="margin-top:10px;font-size:12px;display:flex;gap:6px">
              <span style="background:#f3f4f6;color:#374151;padding:2px 8px;border-radius:4px">${station.chargerType}</span>
              <span style="background:#f3f4f6;color:#374151;padding:2px 8px;border-radius:4px">${station.power}</span>
            </div>
            <div style="margin-top:8px;font-size:12px;font-weight:600;color:${isActive ? "#10b981" : "#94a3b8"}">${station.status}</div>
          </div>`,
          { className: "light-popup" }
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
      style={{ height: "100%", width: "100%", borderRadius: "12px", minHeight: "300px" }}
    />
  );
}
