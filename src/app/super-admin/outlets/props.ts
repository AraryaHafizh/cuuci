export interface OutletProps {
  id: string;
  outletId: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  adminId: string | null;
  orders: any[];
  workers: any[];
  drivers: any[];
}
