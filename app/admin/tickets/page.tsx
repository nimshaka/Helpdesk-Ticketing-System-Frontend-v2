import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Pagination } from "@/components/shared/pagination";
import { requireRole } from "@/features/auth/utils";
import { getTickets } from "@/features/tickets/api";
import { TicketFilterBar } from "@/components/tickets/ticket-filter-bar";
import { TicketTable } from "@/components/tickets/ticket-table";
import { ADMIN_TICKETS_PATH } from "@/features/tickets/constants";
import { parseTicketFilters } from "@/features/tickets/utils";
import { normalizeSearchParams } from "@/utils/normalize-search-params";

type AdminTicketsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminTicketsPage({ searchParams }: AdminTicketsPageProps) {
  await requireRole("admin");

  const filters = parseTicketFilters(normalizeSearchParams(await searchParams));
  const { tickets, meta } = await getTickets(filters);
  const hasFilters = Boolean(filters.search || filters.status || filters.priority || filters.assignment);

  return (
    <>
      <PageHeader title="All tickets" description="Assign tickets to agents and follow every conversation." />
      <TicketFilterBar basePath={ADMIN_TICKETS_PATH} filters={filters} assignmentOptions={["unassigned"]} />

      {tickets.length === 0 ? (
        <EmptyState
          title={hasFilters ? "No tickets match your filters" : "No tickets yet"}
          description={
            hasFilters ? "Try a different search, or clear the filters." : "Tickets will appear here once customers create them."
          }
        />
      ) : (
        <>
          <TicketTable tickets={tickets} basePath={ADMIN_TICKETS_PATH} showAssign />
          <Pagination
            meta={meta}
            pathname={ADMIN_TICKETS_PATH}
            searchParams={{
              search: filters.search,
              status: filters.status,
              priority: filters.priority,
              assignment: filters.assignment,
            }}
          />
        </>
      )}
    </>
  );
}