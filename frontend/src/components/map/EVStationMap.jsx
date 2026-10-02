"use client";

// Requires NEXT_PUBLIC_API_URL env var in Vercel
// Add: NEXT_PUBLIC_API_URL = https://api.soumyashipower.in
// In: vercel.com → soumyasi-pvt-ltd → Settings →
//     Environment Variables

import { useEffect, useRef, useState } from "react";

const esc = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const distanceKm = (a, b) => {
  const rad = (d) => (d * Math.PI) / 180;
  const h =
    Math.sin(rad(b[0] - a[0]) / 2) ** 2 +
    Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(rad(b[1] - a[1]) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
};

const createStationIcon = (L, status) =>
  L.divIcon({
    className: "",
    html: `
      <div style="position:relative;display:flex;align-items:center;justify-content:center;width:36px;height:36px">
        <div style="width:36px;height:36px;background:${status === "Active" ? "#059669" : "#f59e0b"};border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.3)"></div>
        <div style="position:absolute;width:14px;height:14px;background:white;border-radius:50%"></div>
      </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });

export default function EVStationMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef(null);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [layer, setLayer] = useState("road");
  const [locating, setLocating] = useState(false);
  const [locateMsg, setLocateMsg] = useState("");
  const layersRef = useRef({});
  const pinsRef = useRef([]);
  const userMarkerRef = useRef(null);

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
        center: [20.5937, 85.0],
        zoom: 7,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      mapInstanceRef.current = map;
      markersRef.current = L.layerGroup().addTo(map);

      layersRef.current = {
        road: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }),
        satellite: L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            attribution:
              "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            maxZoom: 19,
          }
        ),
      };
      layersRef.current.road.addTo(map);
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
    const map = mapInstanceRef.current;
    const { road, satellite } = layersRef.current;
    if (!map || !road || !satellite) return;
    const next = layer === "road" ? road : satellite;
    const prev = layer === "road" ? satellite : road;
    if (map.hasLayer(prev)) map.removeLayer(prev);
    if (!map.hasLayer(next)) next.addTo(map).bringToBack();
  }, [layer]);

  const locateMe = async () => {
    if (!navigator.geolocation) {
      setLocateMsg("Location is not supported in this browser.");
      return;
    }
    setLocating(true);
    setLocateMsg("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const L = (await import("leaflet")).default;
        const map = mapInstanceRef.current;
        setLocating(false);
        if (!map) return;
        const me = [pos.coords.latitude, pos.coords.longitude];
        if (userMarkerRef.current) userMarkerRef.current.remove();
        userMarkerRef.current = L.circleMarker(me, {
          radius: 8,
          fillColor: "#2563eb",
          color: "#ffffff",
          weight: 3,
          fillOpacity: 1,
        }).addTo(map);

        if (pinsRef.current.length === 0) {
          map.flyTo(me, 10);
          setLocateMsg("No stations to compare yet.");
          return;
        }
        let best = pinsRef.current[0];
        let bestD = Infinity;
        pinsRef.current.forEach((p) => {
          const d = distanceKm(me, [p.station.lat, p.station.lng]);
          if (d < bestD) {
            best = p;
            bestD = d;
          }
        });
        map.fitBounds(L.latLngBounds([me, [best.station.lat, best.station.lng]]), {
          padding: [60, 60],
          maxZoom: 12,
        });
        best.marker.openPopup();
        setLocateMsg(`Nearest: ${best.station.name} (~${Math.round(bestD)} km)`);
      },
      () => {
        setLocating(false);
        setLocateMsg("Couldn't get your location. Check browser permissions.");
      },
      { timeout: 10000 }
    );
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const renderMarkers = async () => {
      const L = (await import("leaflet")).default;
      if (!markersRef.current) return;

      markersRef.current.clearLayers();

      pinsRef.current = [];

      stations.forEach((station) => {
        const isActive = station.status === "Active";
        const marker = L.marker([station.lat, station.lng], {
          icon: createStationIcon(L, station.status),
        });

        marker.bindPopup(
          `<div style="min-width:200px;font-family:Arial,sans-serif;padding:4px">
            <p style="font-weight:bold;color:#d97706;margin:0 0 4px;font-size:14px">${esc(station.name)}</p>
            <p style="color:#78614a;margin:0 0 8px;font-size:12px">${esc(station.city)}, Odisha</p>
            <div style="display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap">
              <span style="background:#ecfdf5;color:#059669;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:bold">${esc(station.charger_type || "Fast")} · ${esc(station.power_kw || 60)}kW</span>
              <span style="background:${isActive ? "#ecfdf5" : "#fffbeb"};color:${isActive ? "#059669" : "#d97706"};padding:2px 8px;border-radius:999px;font-size:11px;font-weight:bold">${esc(station.status)}</span>
            </div>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}" target="_blank" rel="noopener noreferrer" style="display:block;background:#059669;color:white;text-align:center;padding:6px;border-radius:8px;text-decoration:none;font-size:12px;font-weight:bold">🗺️ Get Directions</a>
          </div>`,
          { className: "light-popup" }
        );

        markersRef.current.addLayer(marker);
        pinsRef.current.push({ station, marker });
      });
    };

    renderMarkers();
  }, [stations]);

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <div
        ref={mapRef}
        style={{ height: "100%", width: "100%", borderRadius: "12px", minHeight: "300px", zIndex: 0 }}
      />
      <div style={{ position: "absolute", top: 12, right: 12, zIndex: 1000, display: "flex", background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.25)", border: "1px solid #e8d5b0" }}>
        {[["road", "🛣️ Road"], ["satellite", "🛰️ Satellite"]].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setLayer(key)}
            style={{ padding: "6px 12px", fontSize: 12, fontWeight: 700, border: 0, cursor: "pointer", background: layer === key ? "#059669" : "#fff", color: layer === key ? "#fff" : "#78614a" }}
          >
            {label}
          </button>
        ))}
      </div>
      <div style={{ position: "absolute", left: 12, bottom: 24, zIndex: 1000, display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
        {locateMsg && (
          <div style={{ background: "#fff", color: "#1a1208", fontSize: 12, padding: "6px 10px", borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.25)", maxWidth: 260 }}>
            {locateMsg}
          </div>
        )}
        <button
          type="button"
          onClick={locateMe}
          disabled={locating}
          style={{ padding: "8px 14px", fontSize: 12, fontWeight: 700, borderRadius: 10, border: "1px solid #e8d5b0", background: "#fff", color: "#059669", cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.25)", opacity: locating ? 0.7 : 1 }}
        >
          {locating ? "Locating…" : "📍 Locate Me"}
        </button>
      </div>
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
