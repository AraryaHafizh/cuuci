import SectionInfo from "@/components/SectionInfo";
import { MapPin } from "lucide-react";
import { outletData } from "./data";

export default function Outlet() {
  return (
    <section className="my-10 md:my-20">
      <Info />
    </section>
  );
}

function Info() {
  return (
    <section>
      <SectionInfo
        title={outletData.title}
        description={outletData.description}
        className="flex flex-col items-center text-center"
      />

      <div className="mt-15 gap-5 space-y-5 sm:grid sm:grid-cols-2 sm:gap-5 sm:space-y-0 xl:grid-cols-4 xl:px-0">
        {outletData.outlets.map((outlet, i) => (
          <div
            key={i}
            className="group relative h-55 w-full overflow-hidden rounded-2xl select-none lg:h-70"
          >
            <img
              src={outlet.thumbnail}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 group-active:scale-110"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent transition duration-300 group-hover:from-black group-active:from-black"></div>

            <p className="absolute bottom-5 left-5 flex items-center gap-1 text-white">
              <MapPin size={15} />
              {outlet.location}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
