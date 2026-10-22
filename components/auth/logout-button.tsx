import { Button } from "@/components/ui/button";
import { logoutAction } from "../../features/auth/api";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant="outline">
        Sign out
      </Button>
    </form>
  );
}