import {
  CircleCheck,
  CircleX,
  Clock,
  CreditCard,
  Motorbike,
  Package,
  PackageCheck,
  PackageOpen,
  Scissors,
  WashingMachine,
} from "lucide-react";

export const orderStatusIcons: Record<string, any> = {
  CANCELLED: CircleX,
  WAITING_FOR_PICKUP: Clock,
  LAUNDRY_ON_THE_WAY: Motorbike,
  ARRIVED_AT_OUTLET: PackageOpen,
  WASHING: WashingMachine,
  IRONING: Scissors,
  PACKING: Package,
  WAITING_FOR_PAYMENT: CreditCard,
  READY_FOR_DELIVERY: PackageCheck,
  DELIVERY_ON_THE_WAY: Motorbike,
  COMPLETED: CircleCheck,
};

export const orderStatusColors: Record<string, string> = {
  CANCELLED: "text-red-500",
  WAITING_FOR_PICKUP: "text-yellow-500",
  LAUNDRY_ON_THE_WAY: "text-blue-500",
  ARRIVED_AT_OUTLET: "text-blue-400",
  WASHING: "text-purple-500",
  IRONING: "text-purple-400",
  PACKING: "text-orange-500",
  WAITING_FOR_PAYMENT: "text-yellow-400",
  READY_FOR_DELIVERY: "text-green-500",
  DELIVERY_ON_THE_WAY: "text-blue-600",
  COMPLETED: "text-green-600",
};

export const orderStatusMessages: Record<string, (id: string) => string> = {
  CANCELLED: (id) => `Your order ${id} has been cancelled.`,
  WAITING_FOR_PICKUP: (id) => `Your order ${id} is waiting for pickup.`,
  LAUNDRY_ON_THE_WAY: (id) => `Your order ${id} is on the way to the outlet.`,
  ARRIVED_AT_OUTLET: (id) => `Your order ${id} has arrived at the outlet.`,
  WASHING: (id) => `Your order ${id} is being washed.`,
  IRONING: (id) => `Your order ${id} is being ironed.`,
  PACKING: (id) => `Your order ${id} is being packed.`,
  WAITING_FOR_PAYMENT: (id) => `Your order ${id} is waiting for payment.`,
  READY_FOR_DELIVERY: (id) => `Your order ${id} is ready for delivery.`,
  DELIVERY_ON_THE_WAY: (id) => `Your order ${id} is on the way for delivery.`,
  COMPLETED: (id) => `Your order ${id} has been completed.`,
};

export const recentActivity: Record<string, any> = [
  {
    id: "#LA12339",
    status: "CANCELLED",
    date: "2025-11-18T10:30:00Z",
  },
  {
    id: "#LA12340",
    status: "WAITING_FOR_PICKUP",
    date: "2025-11-17T15:45:00Z",
  },
  {
    id: "#LA12341",
    status: "LAUNDRY_ON_THE_WAY",
    date: "2025-11-16T09:20:00Z",
  },
  {
    id: "#LA12342",
    status: "ARRIVED_AT_OUTLET",
    date: "2025-11-15T13:10:00Z",
  },
  {
    id: "#LA12343",
    status: "WASHING",
    date: "2025-11-14T08:00:00Z",
  },
  {
    id: "#LA12344",
    status: "IRONING",
    date: "2025-11-13T12:00:00Z",
  },
  {
    id: "#LA12345",
    status: "PACKING",
    date: "2025-11-12T09:30:00Z",
  },
  {
    id: "#LA12346",
    status: "WAITING_FOR_PAYMENT",
    date: "2025-11-11T14:15:00Z",
  },
  {
    id: "#LA12347",
    status: "READY_FOR_DELIVERY",
    date: "2025-11-10T10:45:00Z",
  },
  {
    id: "#LA12348",
    status: "DELIVERY_ON_THE_WAY",
    date: "2025-11-09T16:20:00Z",
  },
  {
    id: "#LA12349",
    status: "COMPLETED",
    date: "2025-11-08T08:50:00Z",
  },
];

export const activeOrder: Record<string, any> = [
  {
    id: "#LA12339",
    status: "READY_FOR_DELIVERY",
    date: "2025-11-18T10:30:00Z",
  },
  {
    id: "#LA12338",
    status: "COMPLETED",
    date: "2025-11-17T15:45:00Z",
  },
  {
    id: "#LA12337",
    status: "WAITING_FOR_PAYMENT",
    date: "2025-11-16T09:20:00Z",
  },
  {
    id: "#LA12336",
    status: "IRONING",
    date: "2025-11-15T13:10:00Z",
  },
  {
    id: "#LA12335",
    status: "ARRIVED_AT_OUTLET",
    date: "2025-11-14T08:00:00Z",
  },
];
