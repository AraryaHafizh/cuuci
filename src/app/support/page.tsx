import SectionInfo from "@/components/section-info";
import { supportData } from "./data";
import { Question } from "./Faq";
import { Contact } from "./Contact";

export default function Support() {
  return (
    <main className="container mx-auto mt-80 mb-30">
      <Greeting />
      <section className="mt-50 flex gap-20">
        <Question />
        <Contact />
      </section>
    </main>
  );
}

function Greeting() {
  return (
    <SectionInfo
      title={supportData.title}
      description={supportData.description}
      className="text-center"
    />
  );
}
