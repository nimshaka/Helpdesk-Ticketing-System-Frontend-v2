import { LogoutButton } from "@/components/auth/logout-button";
import { requireRole } from "@/features/auth/utils";

export default async function AgentDashboardPage() {
  const user = await requireRole("agent");

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-2xl font-semibold">Agent dashboard</h1>
      <p>
        Signed in as {user.name} ({user.role})
      </p>
      <LogoutButton />
    </main>
  );
}