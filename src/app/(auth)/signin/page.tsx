import SectionInfo from "@/components/SectionInfo";
import { Form } from "./Form";
import { Logo } from "../Logo";

export default function Signin() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('auth.svg')" }}
    >
      <section className="bg-background h-[55%] w-[30%] rounded-2xl p-15">
        <SectionInfo
          title="Welcome Back!"
          description="Let's get your laundry sorted."
          className="mb-15 text-center"
        />
        <Form />
        <Logo />
      </section>
    </main>
  );
}
