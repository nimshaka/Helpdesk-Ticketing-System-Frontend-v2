import type { TICKET_PRIORITIES, TICKET_STATUSES } from "@/constants/ticket";

export type TicketPriority = (typeof TICKET_PRIORITIES)[number];
export type TicketStatusValue = (typeof TICKET_STATUSES)[number];