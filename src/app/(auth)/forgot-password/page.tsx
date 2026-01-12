import { auth } from "@/auth";
import SectionInfo from "@/components/SectionInfo";
import { redirect } from "next/navigation";
import { Logo } from "../Logo";
import { Form } from "./Form";


const ForgotPassword = async () => {
  const session = await auth();
  
    if (session?.user.role === "CUSTOMER") return redirect("/dashboard");
    if (session?.user.role === "WORKER") return redirect("/worker");
    if (session?.user.role === "DRIVER") return redirect("/driver");
    if (session?.user.role === "OUTLET_ADMIN") return redirect("/admin");
    if (session?.user.role === "SUPER_ADMIN") return redirect("/super-admin");
    else if (session?.user.id) return redirect("/");

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
};

export default ForgotPassword;
