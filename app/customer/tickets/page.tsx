import Link from "next/link";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Pagination } from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { requireRole } from "@/features/auth/utils";
import { getTickets } from "@/features/tickets/api";
import { TicketFilterBar } from "@/components/tickets/ticket-filter-bar";
import { TicketTable } from "@/components/tickets/ticket-table";
import { CUSTOMER_TICKETS_PATH } from "@/features/tickets/constants";
import { parseTicketFilters } from "@/features/tickets/utils";
import { normalizeSearchParams } from "@/utils/normalize-search-params";

type CustomerTicketsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const NEW_TICKET_PATH = `${CUSTOMER_TICKETS_PATH}/new`;

function NewTicketButton() {
  return (
    <Button render={<Link href={NEW_TICKET_PATH} />} nativeButton={false}>
      New ticket
    </Button>
  );
}

function NoTickets({ hasFilters }: { hasFilters: boolean }) {
  if (hasFilters) {
    return (
      <EmptyState
        title="No tickets match your filters"
        description="Try a different search, or clear the filters."
        action={
          <Button variant="outline" render={<Link href={CUSTOMER_TICKETS_PATH} />} nativeButton={false}>
            Clear filters
          </Button>
        }
      />
    );
  }

  return (
    <EmptyState
      title="No tickets yet"
      description="Create your first ticket to get help from our team."
      action={<NewTicketButton />}
    />
  );
}

export default async function CustomerTicketsPage({ searchParams }: CustomerTicketsPageProps) {
  await requireRole("customer");

  const filters = parseTicketFilters(normalizeSearchParams(await searchParams));
  const { tickets, meta } = await getTickets(filters);
  const hasFilters = Boolean(filters.search || filters.status || filters.priority);

  return (
    <>
      <PageHeader
        title="My tickets"
        description="Track the requests you have sent to our team."
        actions={<NewTicketButton />}
      />
      <TicketFilterBar basePath={CUSTOMER_TICKETS_PATH} filters={filters} />

      {tickets.length === 0 ? (
        <NoTickets hasFilters={hasFilters} />
      ) : (
        <>
          <TicketTable tickets={tickets} basePath={CUSTOMER_TICKETS_PATH} />
          <Pagination
            meta={meta}
            pathname={CUSTOMER_TICKETS_PATH}
            searchParams={{
              search: filters.search,
              status: filters.status,
              priority: filters.priority,
            }}
          />
        </>
      )}
    </>
  );
}