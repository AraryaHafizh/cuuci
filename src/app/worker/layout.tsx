import WorkerNavbar from "@/components/navbar/WorkerNavbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <WorkerNavbar />
      <div className="container px-5 md:mx-auto xl:px-0">{children}</div>
    </div>
  );
}
