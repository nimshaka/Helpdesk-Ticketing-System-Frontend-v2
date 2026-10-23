import { PageHeader } from "@/components/shared/page-header";
import { requireRole } from "@/features/auth/utils";

export default async function AgentDashboardPage() {
  const user = await requireRole("agent");

  return <PageHeader title="Agent dashboard" description={`Welcome back, ${user.name}`} />;
}