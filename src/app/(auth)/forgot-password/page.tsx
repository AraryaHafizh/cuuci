import SectionInfo from "@/components/SectionInfo";
import { Logo } from "../Logo";
import { Form } from "./Form";

export default function ForgotPassword() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('auth3.svg')" }}
    >
      <section className="bg-background w-[90%] rounded-2xl p-15 md:w-[50%] lg:w-[40%] 2xl:w-[30%]">
        <SectionInfo
          title="Forgot Ur Password?"
          description="Don’t worry, we’ll help you recover your account."
          className="mb-15 flex flex-col items-center text-center"
        />
        <Form />
        <Logo />
      </section>
    </main>
  );
}
