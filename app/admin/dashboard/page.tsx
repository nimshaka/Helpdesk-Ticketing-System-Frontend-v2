import { PageHeader } from "@/components/shared/page-header";
import { requireRole } from "@/features/auth/utils";

export default async function AdminDashboardPage() {
  const user = await requireRole("admin");

  return <PageHeader title="Admin dashboard" description={`Welcome back, ${user.name}`} />;
}