import Footer from "@/components/footer";
import LandingNavbar from "@/components/navbar/LandingNavbar";
import { ReactNode } from "react";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <LandingNavbar />
      {children}
      <Footer />
    </div>
  );
}
