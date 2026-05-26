"use client";

import { MapContainer, TileLayer, Popup, Polygon } from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// FIX MARKER NEXTJS
delete (
  L.Icon.Default.prototype as unknown as {
    _getIconUrl?: string;
  }
)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const wilayah = [
  {
    nama: "Banyumas",
    posisi: [
      [-7.319, 109.107],
      [-7.361, 109.015],
      [-7.47, 109.025],
      [-7.563, 109.115],
      [-7.64, 109.245],
      [-7.62, 109.41],
      [-7.52, 109.52],
      [-7.38, 109.505],
      [-7.28, 109.37],
      [-7.25, 109.22],
    ] as [number, number][],
    warna: "#2563eb",
  },

  {
    nama: "Purbalingga",
    posisi: [
      [-7.28, 109.25],
      [-7.32, 109.33],
      [-7.37, 109.43],
      [-7.45, 109.5],
      [-7.52, 109.43],
      [-7.5, 109.3],
      [-7.43, 109.22],
    ] as [number, number][],
    warna: "#16a34a",
  },

  {
    nama: "Banjarnegara",
    posisi: [
      [-7.25, 109.5],
      [-7.3, 109.65],
      [-7.4, 109.76],
      [-7.52, 109.73],
      [-7.55, 109.6],
      [-7.47, 109.5],
    ] as [number, number][],
    warna: "#dc2626",
  },

  {
    nama: "Kebumen",
    posisi: [
      [-7.55, 109.45],
      [-7.62, 109.55],
      [-7.7, 109.72],
      [-7.82, 109.78],
      [-7.85, 109.6],
      [-7.76, 109.42],
    ] as [number, number][],
    warna: "#ca8a04",
  },
];

export default function WilayahMap() {
  return (
    <MapContainer
      center={[-7.48, 109.45]}
      zoom={9}
      scrollWheelZoom={false}
      className="w-full h-full rounded-2xl z-0"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {wilayah.map((item, index) => (
        <div key={index}>
          {/* HIGHLIGHT */}
          <Polygon
            positions={item.posisi}
            pathOptions={{
              color: item.warna,
              fillColor: item.warna,
              fillOpacity: 0.35,
              weight: 3,
            }}
          >
            <Popup>
              <div className="font-semibold">Kabupaten {item.nama}</div>
            </Popup>
          </Polygon>
        </div>
      ))}
    </MapContainer>
  );
}
