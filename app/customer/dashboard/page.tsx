import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { getDashboard } from "@/features/dashboard/api";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { requireRole } from "@/features/auth/utils";

export default async function CustomerDashboardPage() {
  const user = await requireRole("customer");
  const dashboard = await getDashboard();

  return (
    <>
      <PageHeader
        title="My dashboard"
        description={`Welcome back, ${user.name}`}
        actions={
          <Button render={<Link href="/customer/tickets/new" />} nativeButton={false}>
            New ticket
          </Button>
        }
      />
      <DashboardView dashboard={dashboard} ticketsPath="/customer/tickets" />
    </>
  );
}