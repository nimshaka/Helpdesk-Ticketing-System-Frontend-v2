import Link from "next/link";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Pagination } from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { requireRole } from "@/features/auth/utils";
import { TicketTable } from "@/components/tickets/ticket-table";
import { MOCK_TICKETS } from "@/features/tickets/mock";
import type { Ticket } from "@/features/tickets/types";
import { normalizeSearchParams } from "@/utils/normalize-search-params";

type CustomerTicketsPageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CustomerTicketsPage({ searchParams }: CustomerTicketsPageProps) {
    await requireRole("customer");
    const params = normalizeSearchParams(await searchParams);

    const tickets: Ticket[] = MOCK_TICKETS; // try `[]` to see the empty state
    const meta = { current_page: Number(params.page) || 1, per_page: 3, total: 9, last_page: 3 };

    return (
        <>
            <PageHeader
                title="My tickets"
                actions={
                    <Button render={<Link href="/customer/tickets/new" />} nativeButton={false}>
                        New ticket
                    </Button>
                }
            />

            {tickets.length === 0 ? (
                <EmptyState
                    title="No tickets yet"
                    description="Create your first ticket to get help from our team."
                    action={
                        <Button render={<Link href="/customer/tickets/new" />} nativeButton={false}>
                            New ticket
                        </Button>
                    }
                />
            ) : (
                <>
                    <TicketTable tickets={tickets} basePath="/customer/tickets" />
                    <Pagination meta={meta} pathname="/customer/tickets" searchParams={params} />
                </>
            )}
        </>
    );
}