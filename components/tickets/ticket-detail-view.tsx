import { BackLink } from "@/components/shared/back-link";
import { isTicketClosed, canClaimTicket, canReplyToTicket } from "@/features/tickets/utils";
import type { TicketDetail, TicketViewer } from "@/features/tickets/types";
import { ReplySection } from "./reply-section";
import { StatusHistory } from "./status-history";
import { TicketActions } from "./ticket-actions";
import { TicketConversation } from "./ticket-conversation";
import { TicketSummary } from "./ticket-summary";
import { WaitingBanner } from "./waiting-banner";
import { AssignmentHistory } from "./assignment-history";

type TicketDetailViewProps = {
  ticket: TicketDetail;
  viewer: TicketViewer;
  backHref: string;
  backLabel: string;
};

export function TicketDetailView({ ticket, viewer, backHref, backLabel }: TicketDetailViewProps) {
  const isWaitingForViewer = viewer.role === "customer" && ticket.status.value === "waiting_for_customer";

  return (
    <>
      <BackLink href={backHref} label={backLabel} />
      {isWaitingForViewer && <WaitingBanner />}

      <div className="space-y-6">
        <TicketSummary ticket={ticket} />
        <TicketActions viewer={viewer} ticket={ticket} />

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-6">
            <TicketConversation replies={ticket.replies} isClosed={isTicketClosed(ticket)} />
            <ReplySection
              ticketId={ticket.id}
              isClosed={isTicketClosed(ticket)}
              canReply={canReplyToTicket(viewer, ticket)}
              canClaim={canClaimTicket(viewer, ticket)}
            />
          </div>
          <div className="space-y-6">
            <StatusHistory entries={ticket.status_history} />
            {/* `assignments` is only sent to admins */}
            {ticket.assignments && <AssignmentHistory entries={ticket.assignments} />}
          </div>
        </div>
      </div>
    </>
  );
}