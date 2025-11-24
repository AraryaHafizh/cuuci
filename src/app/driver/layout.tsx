import DriverNavbar from "@/components/navbar/DriverNavbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <DriverNavbar />
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
