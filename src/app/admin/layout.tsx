import AdminNavbar from "@/components/navbar/AdminNavbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AdminNavbar />
      <div className="container px-5 md:mx-auto xl:px-0">{children}</div>
    </div>
  );
}
