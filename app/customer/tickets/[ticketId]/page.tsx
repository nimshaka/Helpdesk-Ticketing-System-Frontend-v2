import { notFound } from "next/navigation";
import { BackLink } from "@/components/shared/back-link";
import { requireRole } from "@/features/auth/utils";
import { getTicket } from "@/features/tickets/api";
import { ReplySection } from "@/components/tickets/reply-section";
import { StatusHistory } from "@/components/tickets/status-history";
import { TicketConversation } from "@/components/tickets/ticket-conversation";
import { TicketSummary } from "@/components/tickets/ticket-summary";
import { WaitingBanner } from "@/components/tickets/waiting-banner";
import { CUSTOMER_TICKETS_PATH } from "@/features/tickets/constants";
import { canReplyToTicket, isTicketClosed, parseTicketId } from "@/features/tickets/utils";

type CustomerTicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

export default async function CustomerTicketPage({ params }: CustomerTicketPageProps) {
  const user = await requireRole("customer");

  const ticketId = parseTicketId((await params).ticketId);
  if (ticketId === null) notFound();

  const ticket = await getTicket(ticketId);
  if (!ticket) notFound();
  
  console.log("ticket", isTicketClosed(ticket));

  return (
    <>
      <BackLink href={CUSTOMER_TICKETS_PATH} label="Back to my tickets" />

      {ticket.status.value === "waiting_for_customer" && <WaitingBanner />}

      <div className="space-y-6">
        <TicketSummary ticket={ticket} />

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-6">
            <TicketConversation replies={ticket.replies} />
            <ReplySection
              ticketId={ticket.id}
              isClosed={isTicketClosed(ticket)}
              canReply={canReplyToTicket(user, ticket)}
            />
          </div>
          <StatusHistory entries={ticket.status_history} />
        </div>
      </div>
    </>
  );
}