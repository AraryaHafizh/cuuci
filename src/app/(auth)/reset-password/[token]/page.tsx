import { auth } from "@/auth";
import SectionInfo from "@/components/SectionInfo";
import { redirect } from "next/navigation";
import { Form } from "./Form";

interface ResetPasswordProps {
  params: Promise<{ token: string }>;
}

const ResetPassword = async (props: ResetPasswordProps) => {
  const session = await auth();

  if (session?.user.role === "CUSTOMER") return redirect("/dashboard");
  if (session?.user.role === "WORKER") return redirect("/worker");
  if (session?.user.role === "DRIVER") return redirect("/driver");
  if (session?.user.role === "OUTLET_ADMIN") return redirect("/admin");
  if (session?.user.role === "SUPER_ADMIN") return redirect("/super-admin");
  else if (session?.user.id) return redirect("/");

  const { token } = await props.params;
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('../auth4.svg')" }}
    >
      <section className="bg-background w-[90%] rounded-2xl p-15 md:w-[50%] lg:w-[40%] 2xl:w-[30%]">
        <SectionInfo
          title="Insert New Password"
          description="It's ok, it happens! Let’s get you back in."
          className="mb-15 flex flex-col items-center text-center"
        />
        <Form token={token} />
      </section>
    </main>
  );
};

export default ResetPassword;
