/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "src/lib/auth-provider";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const auth: any = useAuth();
  return (
    <Button
      onClick={() => auth.logOut()}
      variant={"ghost"}
      className="border border-blue-400 rounded-2xl mx-2 hover:bg-blue-100 shadow bottom-2"
    >
      Logout
    </Button>
  );
}
