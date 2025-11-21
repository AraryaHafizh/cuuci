"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapPin, Motorbike } from "lucide-react";
import { renderToString } from "react-dom/server";

interface MapProps {
  lat1: number;
  lng1: number;
  lat2: number;
  lng2: number;
}

export default function Map({ lat1, lng1, lat2, lng2 }: MapProps) {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      if (mapRef.current) return;

      const map = L.map("map").setView([lat1, lng1], 13);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const driverIcon = L.divIcon({
        html: renderToString(
          <div className="bg-primary rounded-full p-2 text-white">
            <Motorbike size={24} />
          </div>,
        ),
        className: "",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -35],
      });

      const userIcon = L.divIcon({
        html: renderToString(
          <div className="bg-primary rounded-full p-2 text-white">
            <MapPin size={24} />
          </div>,
        ),
        className: "",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -35],
      });

      const markerDriver = L.marker([lat1, lng1], { icon: driverIcon })
        .addTo(map)
        .bindPopup("Driver");
      const markerUser = L.marker([lat2, lng2], { icon: userIcon })
        .addTo(map)
        .bindPopup("User");

      const group = L.featureGroup([markerDriver, markerUser]);
      map.fitBounds(group.getBounds(), { padding: [50, 50] });

      return () => {
        map.remove(); // cleanup saat unmount
        mapRef.current = null;
      };
    });
  }, [lat1, lng1, lat2, lng2]);

  return <div id="map" className="h-[50vh] w-full rounded-2xl"></div>;
}
