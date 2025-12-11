import SectionInfo from "@/components/SectionInfo";
import { OutletCreateInput } from "../components/OutletCreateInput";

export default function OutletCreate() {
  return (
    <main className="mt-25 mb-20 md:mt-40 lg:mt-45 xl:mt-50">
      <Greeting />
      <OutletCreateInput />
    </main>
  );
}

function Greeting() {
  return (
    <SectionInfo
      title="Create New Outlet"
      description="View, create, and manage all laundry outlets."
    />
  );
}
