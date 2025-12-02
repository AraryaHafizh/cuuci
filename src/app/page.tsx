import LandingLayout from "./(landing)/layout";
import Landing from "./(landing)/page";

export default function Home() {
  return (
    <main>
      <LandingLayout>
        <Landing />
      </LandingLayout>
    </main>
  );
}
