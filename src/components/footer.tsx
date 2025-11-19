"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <section className="container mx-auto mt-20 mb-25 space-y-10 font-light opacity-50">
      <div className="bg-foreground/30 h-0.5 w-full"></div>
      <div className="flex justify-between">
        <p>© 2025 cuuci. All Rights Reserved.</p>
        <div className="space-x-10">
          <Link href={"/"}>Terms of Service</Link>
          <Link href={"/"}>Privacy Policy</Link>
          <Link href={"/"}>Support</Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;
