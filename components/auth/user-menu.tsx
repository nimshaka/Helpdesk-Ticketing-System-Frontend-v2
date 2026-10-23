import { getCurrentUser } from "@/features/auth/utils";
import { LogoutButton } from "./logout-button";

export async function UserMenu() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="hidden text-right sm:block">
        <p className="text-sm font-medium leading-none">{user.name}</p>
        <p className="text-xs capitalize text-muted-foreground">{user.role}</p>
      </div>
      <LogoutButton />
    </div>
  );
}