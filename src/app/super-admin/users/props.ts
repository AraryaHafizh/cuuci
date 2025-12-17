export interface UserProps {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN" | "SUPER_ADMIN" | string;
  phoneNumber: string;
  emailVerified: boolean;
  verifiedAt: string | null;
  profilePictureUrl: string | null;
  provider: "CREDENTIALS" | "GOOGLE" | string;
  createdAt: string;
  updatedAt: string;
  outletId: string | null;
  outletName: string;
}
