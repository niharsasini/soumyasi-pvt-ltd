"use client";

// Requires NEXT_PUBLIC_API_URL env var in Vercel
// Add: NEXT_PUBLIC_API_URL = https://api.soumyashipower.in
// In: vercel.com → soumyasi-pvt-ltd → Settings →
//     Environment Variables

import { useEffect, useRef, useState } from "react";

export default function EVStationMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef(null);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.soumyashipower.in";

    fetch(`${API_URL}/api/v1/ev-stations/`)
      .then((r) => r.json())
      .then((data) => {
        setStations(Array.isArray(data) ? data : []);
      })
      .catch(() => setStations([]))
      .finally(() => setLoading(false));
  }, []);

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
      markersRef.current = L.layerGroup().addTo(map);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "© OpenStreetMap contributors © CARTO",
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const renderMarkers = async () => {
      const L = (await import("leaflet")).default;
      if (!markersRef.current) return;

      markersRef.current.clearLayers();

      stations.forEach((station) => {
        const isActive = station.status === "Active";
        const fillColor = isActive ? "#f59e0b" : "#94a3b8";
        const circle = L.circleMarker([station.lat, station.lng], {
          radius: 9,
          fillColor,
          color: "#ffffff",
          weight: 2.5,
          opacity: 1,
          fillOpacity: 0.9,
        });

        circle.bindPopup(
          `<div style="background:#ffffff;color:#111827;padding:14px 16px;border-radius:12px;min-width:200px;border:1px solid #e5e7eb;box-shadow:0 4px 24px rgba(0,0,0,0.12)">
            <div style="font-weight:700;color:#f59e0b;margin-bottom:5px;font-size:14px">${station.name}</div>
            <div style="font-size:12px;color:#6b7280">${station.city}, Odisha</div>
            <div style="margin-top:10px;font-size:12px;display:flex;gap:6px">
              <span style="background:#f3f4f6;color:#374151;padding:2px 8px;border-radius:4px">${station.charger_type}</span>
              <span style="background:#f3f4f6;color:#374151;padding:2px 8px;border-radius:4px">${station.power_kw}kW</span>
            </div>
            <div style="margin-top:8px;font-size:12px;font-weight:600;color:${isActive ? "#10b981" : "#94a3b8"}">${station.status}</div>
          </div>`,
          { className: "light-popup" }
        );

        markersRef.current.addLayer(circle);
      });
    };

    renderMarkers();
  }, [stations]);

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <div
        ref={mapRef}
        style={{ height: "100%", width: "100%", borderRadius: "12px", minHeight: "300px" }}
      />
      {!loading && stations.length === 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.95)",
              border: "1px solid #e8d5b0",
              borderRadius: "16px",
              padding: "20px 28px",
              textAlign: "center",
              maxWidth: "280px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}
          >
            <p style={{ color: "#1a1208", fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>
              No EV stations configured yet.
            </p>
            <p style={{ color: "#78614a", fontSize: "12px" }}>
              Add stations via the admin panel.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
