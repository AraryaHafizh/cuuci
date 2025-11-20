"use client";

import Link from "next/link";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <section className="container mx-auto mt-20 mb-25 space-y-10 font-light">
      <Separator />
      <div className="flex justify-between">
        <p className="opacity-50">© 2025 cuuci. All Rights Reserved.</p>
        <div className="space-x-10">
          <Link
            href={"/tos"}
            className="opacity-50 transition-opacity duration-300 hover:opacity-100"
          >
            Terms of Service
          </Link>
          <Link
            href={"/privacy-policy"}
            className="opacity-50 transition-opacity duration-300 hover:opacity-100"
          >
            Privacy Policy
          </Link>
          <Link
            href={"/support"}
            className="opacity-50 transition-opacity duration-300 hover:opacity-100"
          >
            Support
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;
