"use client";

import Link from "next/link";

export const Logo = () => {
  return (
    <section className="mt-10 flex justify-center">
      <Link
        href="/"
        className="text-primary hover:text-primary/60 active:text-primary/60 text-xl font-black transition-all duration-300 2xl:text-3xl"
      >
        cuuci
      </Link>
    </section>
  );
};
