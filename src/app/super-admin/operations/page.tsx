import SectionInfo from "@/components/SectionInfo";

export default function Operations() {
  return (
    <main className="mt-50">
      <Greeting />
    </main>
  );
}

function Greeting() {
  return (
    <section className="space-y-10">
      <SectionInfo
        title="View Operations"
        description="Review your past orders and track the history of your laundry requests."
      />
    </section>
  );
}
