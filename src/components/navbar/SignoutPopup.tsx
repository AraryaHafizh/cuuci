import { SignoutConfirmation } from "../popupConfirmation";

export const SignoutPopup = () => {
  return (
    <div className="hidden md:block">
      <SignoutConfirmation>
        <p className="text-destructive cursor-pointer opacity-50 transition-all duration-300 hover:opacity-100">
          Sign out
        </p>
      </SignoutConfirmation>
    </div>
  );
};
