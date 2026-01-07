import SectionInfo from "@/components/SectionInfo";
import BypassLists from "./BypassList";

export default function Orders() {
  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <BypassLists />
    </main>
  );
}

function Greeting() {
  return (
    <section className="space-y-10">
      <SectionInfo
        title="Bypass Request Orders"
        description="Orders that requested bypass."
      />
    </section>
  );
}
