import SuperAdminNavbar from "@/components/navbar/SuperAdminNavbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SuperAdminNavbar />
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
