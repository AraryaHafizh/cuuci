import SuperAdminNavbar from "@/components/navbar/SuperAdminNavbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SuperAdminNavbar />
      <div className="container px-5 md:mx-auto xl:px-0">{children}</div>
    </div>
  );
}
