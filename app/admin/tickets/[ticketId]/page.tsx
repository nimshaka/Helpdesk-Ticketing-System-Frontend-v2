import { notFound } from "next/navigation";
import { requireRole } from "@/features/auth/utils";
import { getTicket } from "@/features/tickets/api";
import { TicketDetailView } from "@/components/tickets/ticket-detail-view";
import { ADMIN_TICKETS_PATH } from "@/features/tickets/constants";
import { parseTicketId } from "@/features/tickets/utils";

type AdminTicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

export default async function AdminTicketPage({ params }: AdminTicketPageProps) {
  const user = await requireRole("admin");

  const ticketId = parseTicketId((await params).ticketId);
  if (ticketId === null) notFound();

  const ticket = await getTicket(ticketId);
  if (!ticket) notFound();

  return (
    <TicketDetailView
      ticket={ticket}
      viewer={user}
      backHref={ADMIN_TICKETS_PATH}
      backLabel="Back to all tickets"
    />
  );
}