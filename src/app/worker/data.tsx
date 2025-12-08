export const userStatus = {
  active: {
    text: "Active",
    textColor: "text-green-700",
    bgColor: "bg-green-700",
  },
  inactive: {
    text: "Inactive",
    textColor: "text-gray-400",
    bgColor: "bg-gray-400",
  },
  break: {
    text: "Break",
    textColor: "text-yellow-400",
    bgColor: "bg-yellow-400",
  },
};

export const tasks = [
  {
    id: "T001",
    userName: "John Carter",
    items: [
      { name: "T-Shirt", qty: 3 },
      { name: "Shorts", qty: 2 },
      { name: "Socks", qty: 5 },
      { name: "Dress", qty: 1 },
      { name: "Jeans", qty: 3 },
      { name: "Scarf", qty: 1 },
      { name: "Socks", qty: 4 },
    ],
    status: "washing",
    stationProgress: {
      washing: "in_progress",
      ironing: "pending",
      packing: "pending",
    },
  },
  {
    id: "T002",
    userName: "Maria Lopez",
    items: [
      { name: "Dress", qty: 1 },
      { name: "Jeans", qty: 3 },
      { name: "Scarf", qty: 1 },
      { name: "Socks", qty: 4 },
    ],
    status: "ironing",
    stationProgress: {
      washing: "done",
      ironing: "in_progress",
      packing: "pending",
    },
  },
  {
    id: "T003",
    userName: "Alex Kim",
    items: [
      { name: "Shirt", qty: 4 },
      { name: "Pants", qty: 1 },
    ],
    status: "packing",
    stationProgress: {
      washing: "done",
      ironing: "done",
      packing: "in_progress",
    },
  },
  {
    id: "T004",
    userName: "Sarah Johnson",
    items: [
      { name: "T-Shirt", qty: 2 },
      { name: "Skirt", qty: 1 },
      { name: "Underwear", qty: 6 },
      { name: "Socks", qty: 3 },
    ],
    status: "washing",
    stationProgress: {
      washing: "pending",
      ironing: "pending",
      packing: "pending",
    },
  },
  {
    id: "T005",
    userName: "Daniel Wu",
    items: [
      { name: "Hoodie", qty: 1 },
      { name: "Jeans", qty: 2 },
      { name: "Towel", qty: 3 },
      { name: "Socks", qty: 2 },
    ],
    status: "ironing",
    stationProgress: {
      washing: "done",
      ironing: "pending",
      packing: "pending",
    },
  },
  {
    id: "T006",
    userName: "Laura Smith",
    items: [
      { name: "Blouse", qty: 2 },
      { name: "Pants", qty: 2 },
      { name: "Scarf", qty: 1 },
      { name: "Towel", qty: 2 },
    ],
    status: "packing",
    stationProgress: {
      washing: "done",
      ironing: "done",
      packing: "pending",
    },
  },
  {
    id: "T007",
    userName: "Michael Brown",
    items: [
      { name: "T-Shirt", qty: 5 },
      { name: "Jacket", qty: 1 },
      { name: "Socks", qty: 3 },
      { name: "Underwear", qty: 6 },
    ],
    status: "washing",
    stationProgress: {
      washing: "in_progress",
      ironing: "pending",
      packing: "pending",
    },
  },
  {
    id: "T008",
    userName: "Emma Wilson",
    items: [
      { name: "Cardigan", qty: 1 },
      { name: "Dress", qty: 2 },
      { name: "Socks", qty: 4 },
      { name: "Underwear", qty: 3 },
    ],
    status: "ironing",
    stationProgress: {
      washing: "done",
      ironing: "pending",
      packing: "pending",
    },
  },
  {
    id: "T009",
    userName: "Kevin Park",
    items: [
      { name: "T-Shirt", qty: 3 },
      { name: "Shorts", qty: 2 },
      { name: "Jeans", qty: 1 },
      { name: "Socks", qty: 2 },
    ],
    status: "packing",
    stationProgress: {
      washing: "done",
      ironing: "done",
      packing: "in_progress",
    },
  },
  {
    id: "T010",
    userName: "Olivia Davis",
    items: [
      { name: "Shirt", qty: 2 },
      { name: "Jeans", qty: 2 },
      { name: "Towel", qty: 1 },
      { name: "Underwear", qty: 5 },
      { name: "Socks", qty: 3 },
    ],
    status: "washing",
    stationProgress: {
      washing: "pending",
      ironing: "pending",
      packing: "pending",
    },
  },
];
