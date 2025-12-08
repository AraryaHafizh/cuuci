import DriverNavbar from "@/components/navbar/DriverNavbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <DriverNavbar />
      <div className="container px-5 md:mx-auto xl:px-0">{children}</div>
    </div>
  );
}
