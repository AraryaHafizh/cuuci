import SectionInfo from "@/components/SectionInfo";
import { greetingData, reasonData } from "./data";

export default function Greeting() {
  return (
    <section className="mt-25 md:mt-40">
      <Banner />
      <Reasons />
    </section>
  );
}

function Banner() {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl xl:h-[800px] xl:rounded-4xl">
      <img
        src={greetingData.thumbnail}
        className="h-full w-full object-cover brightness-75"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-center text-2xl font-bold text-white md:text-4xl lg:text-5xl xl:space-y-5 xl:text-7xl">
        <p>{greetingData.title}</p>
        <p className="text-xs font-normal md:text-lg xl:text-2xl">
          {greetingData.description}
        </p>
      </div>
    </section>
  );
}

function Reasons() {
  return (
    <section className="my-20 xl:my-50">
      <SectionInfo
        title={reasonData.title}
        description={reasonData.description}
        className="flex flex-col items-center text-center"
      />

      <div className="mt-15 space-y-5 sm:grid sm:grid-cols-2 sm:gap-5 sm:space-y-0 xl:grid-cols-4 xl:px-0">
        {reasonData.items.map((item, i) => (
          <div
            key={i}
            className="border-foreground/20 flex flex-1 flex-col items-center rounded-2xl border-2 bg-(--container-bg) p-10 text-center"
          >
            {item.icon}
            <p className="font-semibol mt-8 mb-2 text-lg">{item.title}</p>
            <p className="text-sm font-light opacity-70 md:text-base">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
