import { EmptyState } from "@/components/shared/empty-state";
import { LinkTabs, type LinkTab } from "@/components/shared/link-tabs";
import { PageHeader } from "@/components/shared/page-header";
import { Pagination } from "@/components/shared/pagination";
import { requireRole } from "@/features/auth/utils";
import { getTickets } from "@/features/tickets/api";
import { TicketFilterBar } from "@/components/tickets/ticket-filter-bar";
import { TicketTable } from "@/components/tickets/ticket-table";
import { AGENT_TICKETS_PATH } from "@/features/tickets/constants";
import type { TicketAssignment } from "@/features/tickets/types";
import { parseTicketFilters } from "@/features/tickets/utils";
import { normalizeSearchParams } from "@/utils/normalize-search-params";
import { withSearchParams } from "@/utils/with-search-params";

type AgentTicketsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const TABS: { label: string; assignment?: TicketAssignment }[] = [
  { label: "Unassigned", assignment: "unassigned" },
  { label: "My tickets", assignment: "mine" },
  { label: "All visible" },
];

const EMPTY_MESSAGES: Record<TicketAssignment | "all", string> = {
  unassigned: "The queue is empty. Nothing is waiting to be claimed.",
  mine: "You are not holding any tickets. Claim one from the Unassigned tab.",
  all: "There are no tickets to show yet.",
};

export default async function AgentTicketsPage({ searchParams }: AgentTicketsPageProps) {
  await requireRole("agent");

  const filters = parseTicketFilters(normalizeSearchParams(await searchParams));
  const { tickets, meta } = await getTickets(filters);
  const hasFilters = Boolean(filters.search || filters.status || filters.priority);

  const currentParams = {
    search: filters.search,
    status: filters.status,
    priority: filters.priority,
    assignment: filters.assignment,
  };

  // Switching tabs keeps the search and filters but starts again from page 1.
  const tabs: LinkTab[] = TABS.map((tab) => ({
    label: tab.label,
    active: filters.assignment === tab.assignment,
    href: withSearchParams(AGENT_TICKETS_PATH, currentParams, {
      assignment: tab.assignment,
      page: undefined,
    }),
  }));

  return (
    <>
      <PageHeader title="Tickets" description="Claim tickets from the queue and work on the ones you hold." />
      <LinkTabs tabs={tabs} label="Ticket views" />
      <TicketFilterBar basePath={AGENT_TICKETS_PATH} filters={filters} />

      {tickets.length === 0 ? (
        <EmptyState
          title={hasFilters ? "No tickets match your filters" : "No tickets here"}
          description={
            hasFilters
              ? "Try a different search, or clear the filters."
              : EMPTY_MESSAGES[filters.assignment ?? "all"]
          }
        />
      ) : (
        <>
          <TicketTable tickets={tickets} basePath={AGENT_TICKETS_PATH} showClaim />
          <Pagination meta={meta} pathname={AGENT_TICKETS_PATH} searchParams={currentParams} />
        </>
      )}
    </>
  );
}