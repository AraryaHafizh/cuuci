import Banner from "./Banner";
import Greeting from "./Greeting";
import Outlet from "./Outlet";
import Workflow from "./workflow";

export default function Landing() {
  return (
    <main className="container px-5 md:mx-auto xl:px-0">
      <Greeting />
      <Workflow />
      <Outlet />
      <Banner />
    </main>
  );
}
