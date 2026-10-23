import { PageHeader } from "@/components/shared/page-header";
import { requireRole } from "@/features/auth/utils";

export default async function CustomerDashboardPage() {
  const user = await requireRole("customer");

  return <PageHeader title="Customer dashboard" description={`Welcome back, ${user.name}`} />;
}