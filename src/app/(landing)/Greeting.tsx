import SectionInfo from "@/components/SectionInfo";
import { greetingData, reasonData } from "./data";

export default function Greeting() {
  return (
    <section className="mt-40">
      <Banner />
      <Reasons />
    </section>
  );
}

function Banner() {
  return (
    <section className="relative h-[800px] w-full overflow-hidden rounded-4xl">
      <img
        src={greetingData.thumbnail}
        className="h-full w-full object-cover brightness-75"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-5 text-7xl font-bold text-white">
        <p>{greetingData.title}</p>
        <p className="mb-10 text-2xl font-normal">{greetingData.description}</p>
      </div>
    </section>
  );
}

function Reasons() {
  return (
    <section className="my-50">
      <SectionInfo
        title={reasonData.title}
        description={reasonData.description}
        className="text-center"
      />

      <div className="mt-15 flex space-x-5">
        {reasonData.items.map((item, i) => (
          <div
            key={i}
            className="border-foreground/20 flex flex-1 flex-col items-center rounded-2xl border-2 bg-(--container-bg) p-10 text-center"
          >
            {item.icon}
            <p className="font-semibol mt-8 mb-2 text-lg">{item.title}</p>
            <p className="font-light opacity-70">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
