import { Lock, MessageSquare, UserRound } from "lucide-react";

export const menuItems = [
  {
    Icon: UserRound,
    label: "Profile",
    index: 0,
  },
  {
    Icon: Lock,
    label: "Password",
    index: 1,
  },
  {
    Icon: MessageSquare,
    label: "Address",
    index: 2,
  },
];

export const userAddress = [
  {
    label: "Home",
    address: "Jl. Melati No. 12, Bandung, Jawa Barat",
    latitude: -6.914744,
    longitude: 107.60981,
    isDefault: true,
  },
  {
    label: "Office",
    address: "Graha Mandiri Lt. 5, Jakarta Pusat",
    latitude: -6.193125,
    longitude: 106.82181,
    isDefault: false,
  },
  {
    label: "Parent's House",
    address: "Jl. Kenanga No. 45, Cimahi, Jawa Barat",
    latitude: -6.872233,
    longitude: 107.542557,
    isDefault: false,
  },
  {
    label: "Apartment",
    address: "The Oasis Apartment Tower B, Bekasi",
    latitude: -6.244456,
    longitude: 106.992239,
    isDefault: false,
  },
  {
    label: "Warehouse",
    address: "Kawasan Industri Jababeka 2, Cikarang",
    latitude: -6.304512,
    longitude: 107.171112,
    isDefault: false,
  },
  {
    label: "Gym",
    address: "Jl. Setiabudhi No. 208, Bandung",
    latitude: -6.86324,
    longitude: 107.595601,
    isDefault: false,
  },
];
