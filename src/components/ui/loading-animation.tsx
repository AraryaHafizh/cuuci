import { Loader } from "lucide-react";

export const LoadingScreen = ({
  isDashboard = false,
}: {
  isDashboard?: boolean;
}) => {
  return (
    <main
      className={`flex ${isDashboard ? "h-full" : "h-screen"} items-center justify-center`}
    >
      <Loader className="animation-duration-[1500ms] animate-spin" />
    </main>
  );
};

export const LoadingAnimation = () => {
  return (
    <main className="">
      <Loader className="animation-duration-[1500ms] animate-spin" />
    </main>
  );
};
