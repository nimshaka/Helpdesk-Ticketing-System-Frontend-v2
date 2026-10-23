import { PageHeader } from "@/components/shared/page-header";
import { requireRole } from "@/features/auth/utils";
import { getDashboard } from "@/features/dashboard/api";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export default async function AgentDashboardPage() {
  const user = await requireRole("agent");
  const dashboard = await getDashboard();

  return (
    <>
      <PageHeader title="Agent dashboard" description={`Welcome back, ${user.name}`} />
      <DashboardView dashboard={dashboard} ticketsPath="/agent/tickets" />
    </>
  );
}