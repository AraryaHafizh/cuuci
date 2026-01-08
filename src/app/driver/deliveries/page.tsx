import SectionInfo from "@/components/SectionInfo";
import ClientPage from "./ClientPage";

export default function Delivery() {
  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <ClientPage/>
    </main>
  );
}

function Greeting() {
  return (
    <section className="space-y-10">
      <SectionInfo
        title="Delivery History"
        description="Review your completed delivery and track your past deliveries."
      />
    </section>
  );
}
