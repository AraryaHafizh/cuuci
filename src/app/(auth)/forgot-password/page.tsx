import SectionInfo from "@/components/SectionInfo";
import { Logo } from "../Logo";
import { Form } from "./Form";

export default function ForgotPassword() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('auth3.svg')" }}
    >
      <section className="bg-background h-[55%] w-[30%] rounded-2xl p-15">
        <SectionInfo
          title="Forgot Ur Password?"
          description="Don’t worry, we’ll help you recover your account."
          className="mb-15 text-center"
        />
        <Form />
        <Logo />
      </section>
    </main>
  );
}
