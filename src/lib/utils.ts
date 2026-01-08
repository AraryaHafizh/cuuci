import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNow, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(isoDate: string): string {
  const date = parseISO(isoDate);
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatDate(
  dateString: string,
  mode: "all" | "date" | "time" = "all",
) {
  if (dateString === null) return "-";

  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  const datePart = `${day} ${month} ${year}`;

  const timePart = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (mode === "date") return datePart;
  if (mode === "time") return timePart;

  return `${datePart} - ${timePart}`;
}

export function formatOrderStatus(status: string): string {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): string {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const distance = 2 * R * Math.asin(Math.sqrt(a));

  return `${distance.toFixed(2)} km`;
}

export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatPhone(value: string) {
  const cleaned = value.replace(/\D/g, "");

  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 7) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;

  return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7, 11)}`;
}

export function formatPhoneDb(value?: string) {
  if (!value) return "";

  const cleaned = value.replace(/\D/g, "");

  if (!cleaned.startsWith("62")) return value;

  const country = "62";
  const rest = cleaned.slice(2);

  if (rest.length <= 3) return `+${country} ${rest}`;
  if (rest.length <= 7)
    return `+${country} ${rest.slice(0, 3)} ${rest.slice(3)}`;

  return `+${country} ${rest.slice(0, 3)} ${rest.slice(3, 7)} ${rest.slice(7, 11)}`;
}

export const getLocation = () =>
  new Promise<{ lat: number; lng: number }>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation tidak didukung");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      (err) => reject(err),
    );
  });

export function generatePassword(length = 8): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}

export function formatHistoryStatus(status: string) {
  switch (status) {
    case "CREATED":
      return "Order created";
    case "PICKUP":
      return "Pickup order";
    case "WASHING":
      return "Washing";
    case "IRONING":
      return "Ironing";
    case "PACKING":
      return "Packing";
    case "DELIVERY":
      return "Delivery to customer";
    default:
      return "Unknown status";
  }
}
