"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import L from "leaflet";
import { EV_STATIONS } from "@/lib/data/ev-stations";
import "leaflet/dist/leaflet.css";

// Fix default marker icons broken by webpack/Next.js bundling
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ODISHA_CENTER = [20.9517, 85.0985];
const INITIAL_ZOOM = 7;

const ACTIVE_COLOR = "#f59e0b";
const SOON_COLOR = "#6b7280";

function StationMarker({ station }) {
  const isActive = station.status === "Active";
  return (
    <CircleMarker
      center={[station.lat, station.lng]}
      radius={isActive ? 9 : 7}
      pathOptions={{
        color: isActive ? ACTIVE_COLOR : SOON_COLOR,
        fillColor: isActive ? ACTIVE_COLOR : SOON_COLOR,
        fillOpacity: isActive ? 0.9 : 0.5,
        weight: 2,
      }}
    >
      <Popup closeButton={false}>
        <div style={{
          background: "#0f172a",
          border: "1px solid rgba(245,158,11,0.3)",
          borderRadius: "10px",
          padding: "12px 14px",
          minWidth: "200px",
          fontFamily: "inherit",
        }}>
          <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>
            {station.name}
          </p>
          <p style={{ color: "#94a3b8", fontSize: "11px", marginBottom: "8px" }}>
            {station.city} · {station.address.split(",")[0]}
          </p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <span style={{
              background: isActive ? "rgba(245,158,11,0.15)" : "rgba(107,114,128,0.2)",
              color: isActive ? "#f59e0b" : "#9ca3af",
              border: `1px solid ${isActive ? "rgba(245,158,11,0.4)" : "rgba(107,114,128,0.4)"}`,
              borderRadius: "9999px",
              padding: "2px 8px",
              fontSize: "10px",
              fontWeight: 600,
            }}>
              {station.status}
            </span>
            <span style={{
              background: "rgba(59,130,246,0.15)",
              color: "#60a5fa",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: "9999px",
              padding: "2px 8px",
              fontSize: "10px",
              fontWeight: 600,
            }}>
              {station.chargerType} · {station.power}
            </span>
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
}

export default function EVStationMap() {
  return (
    <MapContainer
      center={ODISHA_CENTER}
      zoom={INITIAL_ZOOM}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", background: "#0a0f1e" }}
      className="ev-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={19}
      />
      {EV_STATIONS.map((station) => (
        <StationMarker key={station.id} station={station} />
      ))}
    </MapContainer>
  );
}
