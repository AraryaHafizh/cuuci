"use client";

import { getLocation } from "@/lib/utils";
import "leaflet/dist/leaflet.css";
import { LocateFixed, MapPin, Motorbike } from "lucide-react";
import { useEffect, useRef } from "react";
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

      const focusControl = L.Control.extend({
        options: { position: "bottomright" },
        onAdd: function () {
          const container = L.DomUtil.create(
            "div",
            "leaflet-bar p-2 rounded bg-white shadow-lg cursor-pointer",
          );

          L.DomEvent.disableClickPropagation(container);

          container.innerHTML = renderToString(
            <LocateFixed size={20} className="text-black" />,
          );

          container.onclick = () => {
            const group = L.featureGroup([markerDriver, markerUser]);
            map.fitBounds(group.getBounds(), { padding: [10, 10] });
          };

          return container;
        },
      });

      map.addControl(new focusControl());

      return () => {
        map.remove();
        mapRef.current = null;
      };
    });
  }, [lat1, lng1, lat2, lng2]);

  return <div id="map" className="h-[50vh] w-full rounded-2xl"></div>;
}

interface MapSelectProps {
  centerLat: number;
  centerLng: number;
  onSelect: (lat: number, lng: number, address: string) => void;
  isEdit?: boolean;
}

export function MapSelect({
  centerLat,
  centerLng,
  onSelect,
  isEdit = false,
}: MapSelectProps & { isEdit?: boolean }) {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    import("leaflet").then(async (L) => {
      if (mapRef.current) return;

      const map = L.map("map-select").setView(
        [centerLat, centerLng],
        isEdit ? 16 : 13,
      );
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const pinIcon = L.divIcon({
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

      if (isEdit && centerLat && centerLng) {
        const initialMarker = L.marker([centerLat, centerLng], {
          icon: pinIcon,
        }).addTo(map);
        markerRef.current = initialMarker;
      }

      map.on("click", async (e: any) => {
        const { lat, lng } = e.latlng;

        if (markerRef.current) map.removeLayer(markerRef.current);

        const newMarker = L.marker([lat, lng], { icon: pinIcon }).addTo(map);
        markerRef.current = newMarker;

        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
        let address = "Unknown location";
        try {
          const res = await fetch(url);
          const data = await res.json();
          address = data.display_name ?? "Unknown location";
        } catch (err) {
          console.error("Reverse geocoding failed:", err);
        }

        onSelect(lat, lng, address);
      });

      const focusControl = L.Control.extend({
        options: { position: "bottomright" },
        onAdd: function () {
          const container = L.DomUtil.create(
            "div",
            "leaflet-bar p-2 rounded bg-white shadow-lg cursor-pointer",
          );

          L.DomEvent.disableClickPropagation(container);
          container.innerHTML = renderToString(
            <LocateFixed size={20} className="text-black" />,
          );

          container.onclick = async () => {
            try {
              const { lat, lng } = await getLocation();
              map.setView([lat, lng], 16);

              if (markerRef.current) map.removeLayer(markerRef.current);

              const newMarker = L.marker([lat, lng], { icon: pinIcon }).addTo(
                map,
              );
              markerRef.current = newMarker;

              const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
              let address = "Unknown location";

              try {
                const res = await fetch(url);
                const data = await res.json();
                address = data.display_name ?? "Unknown location";
              } catch (err) {
                console.error("Reverse geocode fail:", err);
              }

              onSelect(lat, lng, address);
            } catch (e) {
              console.error("Gagal ambil lokasi:", e);
            }
          };

          return container;
        },
      });

      map.addControl(new focusControl());
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [centerLat, centerLng, onSelect, isEdit]);

  return <div id="map-select" className="h-[50vh] w-full rounded-2xl"></div>;
}
