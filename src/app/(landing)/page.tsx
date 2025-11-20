import Banner from "./Banner";
import Greeting from "./Greeting";
import Outlet from "./Outlet";
import Workflow from "./workflow";

export default function Landing() {
  return (
    <main className="container mx-auto">
      <Greeting />
      <Workflow />
      <Outlet />
      <Banner />
    </main>
  );
}
