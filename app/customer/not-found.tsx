import { TicketNotFound } from "@/components/tickets/ticket-not-found";
import { CUSTOMER_TICKETS_PATH } from "@/features/tickets/constants";

export default function CustomerNotFound() {
  return <TicketNotFound backHref={CUSTOMER_TICKETS_PATH} />;
}