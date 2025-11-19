import SectionInfo from "@/components/section-info";
import { Form } from "./Form";
import { Logo } from "../Logo";

export default function Signup() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/auth2.svg')" }}
    >
      <section className="bg-background h-[55%] w-[30%] rounded-2xl p-15">
        <SectionInfo
          title="Hello New User!"
          description="Ready to simplify your laundry routine?"
          className="mb-15 text-center"
        />
        <Form />
        <Logo />
      </section>
    </main>
  );
}
