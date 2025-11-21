import WorkerNavbar from "@/components/navbar/WorkerNavbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <WorkerNavbar />
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
