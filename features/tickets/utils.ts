import { TICKET_PRIORITIES, TICKET_STATUSES, CLOSED_TICKET_STATUS} from "@/constants/ticket";
import { TICKET_ASSIGNMENTS } from "./constants";
import type { TicketFilters } from "./types";
import {  } from "@/constants/ticket";
import type { UserRole } from "@/types/user";
import type { Ticket } from "./types";

function parsePage(value?: string): number | undefined {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : undefined;
}

export function parseTicketFilters(params: Record<string, string | undefined>): TicketFilters {
  return {
    search: params.search?.trim() || undefined,
    status: TICKET_STATUSES.find((status) => status === params.status),
    priority: TICKET_PRIORITIES.find((priority) => priority === params.priority),
    assignment: TICKET_ASSIGNMENTS.find((assignment) => assignment === params.assignment),
    page: parsePage(params.page),
  };
}

type Viewer = { id: number; role: UserRole };

export function parseTicketId(value: string): number | null {
  return /^\d+$/.test(value) ? Number(value) : null;
}

export function isTicketClosed(ticket: Pick<Ticket, "status">): boolean {
  return ticket.status.value === CLOSED_TICKET_STATUS;
}

/** Mirrors the brief: customers reply on their own tickets, agents on tickets they hold, admins anywhere. Closed tickets accept no replies. */
export function canReplyToTicket(viewer: Viewer, ticket: Ticket): boolean {
  if (isTicketClosed(ticket)) return false;

  switch (viewer.role) {
    case "customer":
      return ticket.customer.id === viewer.id;
    case "agent":
      return ticket.agent?.id === viewer.id;
    case "admin":
      return true;
  }
}