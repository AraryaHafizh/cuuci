import Footer from "@/components/footer";
import Navbar from "@/components/navbar/LandingNavbar";
import { ReactNode } from "react";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
