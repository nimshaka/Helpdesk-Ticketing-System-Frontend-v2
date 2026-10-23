import type { TicketPriority, TicketStatusValue } from "@/types/ticket";
import type { z } from "zod";
import type { TICKET_ASSIGNMENTS } from "./constants";
import type { createTicketSchema } from "./schemas";

export type Ticket = {
  id: number;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: { value: TicketStatusValue; label: string };
  customer: { id: number; name: string };
  agent: { id: number; name: string } | null;
  last_activity_at: string;
  created_at: string;
  updated_at: string;
};

export type TicketAssignment = (typeof TICKET_ASSIGNMENTS)[number];

export type TicketFilters = {
  search?: string;
  status?: TicketStatusValue;
  priority?: TicketPriority;
  assignment?: TicketAssignment;
  page?: number;
};

export type CreateTicketValues = z.infer<typeof createTicketSchema>;