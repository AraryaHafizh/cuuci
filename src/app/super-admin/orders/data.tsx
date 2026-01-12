export const dummyOrders = [
  {
    orderId: "ORD001",
    customerName: "John Doe",
    outletName: "Laundry Outlet A",
    orderStatus: "Laundry Sedang Dicuci",
    totalItems: 8,
    totalWeight: 5.2,
    pickupDateTime: "2025-11-26 09:00",
    deliveryDateTime: "2025-11-27 15:00",
    createdAt: "2025-11-26 08:50",
  },
  {
    orderId: "ORD002",
    customerName: "Jane Smith",
    outletName: "Laundry Outlet B",
    orderStatus: "Menunggu Penjemputan Driver",
    totalItems: 12,
    totalWeight: 7.5,
    pickupDateTime: "2025-11-26 10:00",
    deliveryDateTime: "2025-11-27 16:00",
    createdAt: "2025-11-26 09:30",
  },
  {
    orderId: "ORD003",
    customerName: "Alice Johnson",
    outletName: "Laundry Outlet C",
    orderStatus: "Laundry Siap Diantar",
    totalItems: 5,
    totalWeight: 3.0,
    pickupDateTime: "2025-11-25 14:00",
    deliveryDateTime: "2025-11-26 12:00",
    createdAt: "2025-11-25 13:50",
  },
];

export const dummyLog = [
  {
    id: 1,
    status: "ORDER_PLACED",
    message: "Order has been placed by customer",
    assigned: "System",
    timestamp: "2025-01-12T08:00:00Z",
  },
  {
    id: 2,
    status: "WAITING_FOR_PICKUP",
    message: "Order is waiting for courier pickup",
    assigned: "System",
    timestamp: "2025-01-12T08:05:00Z",
  },
  {
    id: 3,
    status: "LAUNDRY_ON_THE_WAY",
    message: "Courier is on the way to customer",
    assigned: "Rizky",
    timestamp: "2025-01-12T08:20:00Z",
  },
  {
    id: 4,
    status: "ARRIVED_AT_OUTLET",
    message: "Laundry has arrived at outlet",
    assigned: "Dewi",
    timestamp: "2025-01-12T09:00:00Z",
  },
  {
    id: 5,
    status: "WASHING",
    message: "Laundry washing process started",
    assigned: "Dewi",
    timestamp: "2025-01-12T09:30:00Z",
  },
  {
    id: 6,
    status: "IRONING",
    message: "Ironing process started",
    assigned: "Dewi",
    timestamp: "2025-01-12T11:00:00Z",
  },
  {
    id: 7,
    status: "PACKING",
    message: "Laundry is being packed",
    assigned: "Dewi",
    timestamp: "2025-01-12T12:00:00Z",
  },
  {
    id: 8,
    status: "WAITING_FOR_PAYMENT",
    message: "Waiting for customer payment",
    assigned: "System",
    timestamp: "2025-01-12T12:30:00Z",
  },
  {
    id: 9,
    status: "READY_FOR_DELIVERY",
    message: "Order is ready for delivery",
    assigned: "Andi",
    timestamp: "2025-01-12T13:00:00Z",
  },
  {
    id: 10,
    status: "DELIVERY_ON_THE_WAY",
    message: "Courier is delivering order",
    assigned: null,
    timestamp: null,
  },
  {
    id: 11,
    status: "COMPLETED",
    message: "Order has been completed and delivered",
    assigned: null,
    timestamp: null,
  },
];

export const dummyBypass = [
  {
    requestId: "BR-00123",
    station: "Washing",
    workerName: "Rina Putri",
    adminName: "Jonathan",
    status: "Pending",
    timestamp: "2025-01-12T09:18:33Z",
    items: [
      {
        itemName: "T-Shirt",
        prev: 10,
        curr: 9,
        diff: -1,
      },
      {
        itemName: "Short Pants",
        prev: 5,
        curr: 5,
        diff: 0,
      },
      {
        itemName: "Jacket",
        prev: 5,
        curr: 2,
        diff: -3,
      },
    ],
  },
  {
    requestId: "BR-00124",
    station: "Ironing",
    workerName: "Budi Santoso",
    adminName: "Jonathan",
    status: "Approved",
    timestamp: "2025-01-12T11:46:10Z",
    items: [
      {
        itemName: "Jeans",
        prev: 3,
        curr: 4,
        diff: +1,
      },
      {
        itemName: "T-Shirt",
        prev: 8,
        curr: 8,
        diff: 0,
      },
    ],
  },
  {
    requestId: "BR-00125",
    station: "Packing",
    workerName: "Laras Dewi",
    adminName: "Jonathan",
    status: "Rejected",
    timestamp: "2025-01-12T14:05:52Z",
    items: [
      {
        itemName: "Underwear",
        prev: 12,
        curr: 11,
        diff: -1,
      },
      {
        itemName: "Socks",
        prev: 6,
        curr: 7,
        diff: +1,
      },
    ],
  },
];

// ===================================

export const filterStatus = {
  LOOKING_FOR_DRIVER: "Looking for Driver",
  WAITING_FOR_PICKUP: "Waiting for Pickup",
  LAUNDRY_ON_THE_WAY: "Laundry on the Way",
  ARRIVED_AT_OUTLET: "Arrived at Outlet",
  WASHING: "Washing",
  IRONING: "Ironing",
  PACKING: "Packing",
  WAITING_FOR_PAYMENT: "Waiting for Payment",
  READY_FOR_DELIVERY: "Ready for Delivery",
  DELIVERY_ON_THE_WAY: "Delivery on the Way",
  COMPLETED: "Completed",
  ALL: "All",
};

export const statusRouteOrder = [
  "WAITING_FOR_PICKUP",
  "LAUNDRY_ON_THE_WAY",
  "ARRIVED_AT_OUTLET",
  "WASHING",
  "IRONING",
  "PACKING",
  "WAITING_FOR_PAYMENT",
  "READY_FOR_DELIVERY",
  "DELIVERY_ON_THE_WAY",
  "COMPLETED",
];

export const oderTabKey = ["Notes", "Report"];
