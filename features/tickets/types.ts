import type { TicketPriority, TicketStatusValue } from "@/types/ticket";

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