import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LandingLayout from "./(landing)/layout";
import Landing from "./(landing)/page";

const Home = async () => {
  const session = await auth();

  if (session?.user.role === "CUSTOMER") return redirect("/dashboard");
  if (session?.user.role === "WORKER") return redirect("/worker");
  if (session?.user.role === "DRIVER") return redirect("/driver");
  if (session?.user.role === "OUTLET_ADMIN") return redirect("/admin");
  if (session?.user.role === "SUPER_ADMIN") return redirect("/super-admin");
  else if (session?.user.id) return redirect("/");

  return (
    <main>
      <LandingLayout>
        <Landing />
      </LandingLayout>
    </main>
  );
};

export default Home;
