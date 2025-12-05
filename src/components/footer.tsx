"use client";

import Link from "next/link";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <section className="container mt-20 mb-10 space-y-10 px-5 text-xs font-light md:mx-auto md:px-0 md:text-base lg:px-5 xl:px-0">
      <Separator />
      <div className="justify-between space-y-5 md:flex md:space-y-0">
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
}
