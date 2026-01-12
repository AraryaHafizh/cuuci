"use client";

import { Button } from "@/components/ui/button";
import { bannerData } from "./data";
import { useRouter } from "next/navigation";

export default function Banner() {
  return (
    <section className="relative">
      <EndBanner />
      <Info />
    </section>
  );
}

function Info() {
  const route = useRouter();
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center md:px-0">
      <div className="mb-5 space-y-2 lg:mb-10 lg:space-y-5">
        <p className="text-primary text-4xl font-black lg:text-6xl">
          {bannerData.title}
        </p>
        <p className="text-sm opacity-50 md:text-lg lg:text-xl">
          {bannerData.description}
        </p>
      </div>
      <Button
        size={"lg"}
        className="w-fit"
        onClick={() => route.push("/signin")}
      >
        Schedule your first pickup
      </Button>
    </div>
  );
}

function EndBanner() {
  return (
    <div className="h-[500px] overflow-hidden rounded-3xl bg-(--container-bg)"></div>
  );
}
