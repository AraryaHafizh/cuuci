import AdminNavbar from "@/components/navbar/AdminNavbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AdminNavbar />
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
