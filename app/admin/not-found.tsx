import { TicketNotFound } from "@/components/tickets/ticket-not-found";
import { ADMIN_TICKETS_PATH } from "@/features/tickets/constants";

export default function AdminNotFound() {
  return <TicketNotFound backHref={ADMIN_TICKETS_PATH} />;
}