import type { TicketPriority, TicketStatusValue } from "@/types/ticket";
import type { z } from "zod";
import type { TICKET_ASSIGNMENTS } from "./constants";
import type { createTicketSchema } from "./schemas";
import type { UserRole } from "@/types/user";
import type { replySchema } from "./schemas";

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

export type TicketReply = {
  id: number;
  body: string;
  author: { id: number; name: string; role: UserRole };
  created_at: string;
};

export type StatusHistoryEntry = {
  id: number;
  from: Ticket["status"] | null; // null for the first entry (ticket created)
  to: Ticket["status"];
  changed_by: { id: number; name: string };
  created_at: string;
};

export type AssignmentHistoryEntry = {
  agent: { id: number; name: string };
  assigned_by: number; // an id only, not an object
  assigned_at: string;
  unassigned_at: string | null;
};

export type TicketDetail = Ticket & {
  replies: TicketReply[]; // oldest first
  status_history: StatusHistoryEntry[];
  assignments?: AssignmentHistoryEntry[]; // admin only
};

export type ReplyValues = z.infer<typeof replySchema>;

export type TicketViewer = { id: number; role: UserRole };