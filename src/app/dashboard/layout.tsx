import DashboardNavbar from "@/components/navbar/DashboardNavbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <DashboardNavbar />
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
