import SectionInfo from "@/components/SectionInfo";
import { Form } from "./Form";

interface ResetPasswordProps {
  params: Promise<{ token: string }>;
}

async function page(props: ResetPasswordProps) {
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
}

export default page;
