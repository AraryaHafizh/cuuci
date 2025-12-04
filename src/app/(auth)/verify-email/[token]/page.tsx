import SectionInfo from "@/components/SectionInfo";
import { VerifyButton } from "./VerifyButton";

interface VerifyEmaildProps {
  params: Promise<{ token: string }>;
}

async function page(props: VerifyEmaildProps) {
  const { token } = await props.params;
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('../auth4.svg')" }}
    >
      <section className="bg-background flex h-[55%] w-[30%] flex-col justify-center rounded-2xl p-15">
        <SectionInfo
          title="One last step ✨"
          description="Just tap the button below to complete your email verification."
          className="mb-15 flex flex-col items-center text-center"
        />
        <VerifyButton token={token} />
      </section>
    </main>
  );
}

export default page;
