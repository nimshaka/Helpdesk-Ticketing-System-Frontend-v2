import { TICKET_PRIORITIES, TICKET_STATUSES } from "@/constants/ticket";
import { TICKET_ASSIGNMENTS } from "./constants";
import type { TicketFilters } from "./types";

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