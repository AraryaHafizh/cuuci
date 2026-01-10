import { Attendance } from "./attendance";
import AvailableTasks from "./AvailableTasks";
import { Greeting } from "./Greeting";
import { Overview } from "./Overview";

export default function Worker() {
  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <section className="mt-10 gap-5 space-y-5 lg:flex lg:space-y-0 xl:mt-20">
        <Attendance />
        <Overview />
      </section>
      <AvailableTasks />
    </main>
  );
}
