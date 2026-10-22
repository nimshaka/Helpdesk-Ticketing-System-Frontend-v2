import { LogoutButton } from "@/components/auth/logout-button";
import { requireRole } from "@/features/auth/utils";

export default async function AdminDashboardPage() {
  const user = await requireRole("admin");

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-2xl font-semibold">Admin dashboard</h1>
      <p>
        Signed in as {user.name} ({user.role})
      </p>
      <LogoutButton />
    </main>
  );
}