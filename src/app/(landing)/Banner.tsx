import { Button } from "@/components/ui/button";
import { bannerData } from "./data";

export default function Banner() {
  return (
    <section className="relative">
      <EndBanner />
      <Info />
    </section>
  );
}

function Info() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-5">
      <p className="text-primary text-6xl font-black">{bannerData.title}</p>
      <p className="text-xl opacity-50">{bannerData.description}</p>
      <Button size={"lg"} className="w-fit">
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
