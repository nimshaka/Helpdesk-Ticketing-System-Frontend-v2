import type { TicketStatusValue } from "@/types/ticket";

export type StatusCount = {
  status: TicketStatusValue;
  label: string;
  count: number;
};

export type ActivityType = "reply" | "status_change";

export type ActivityItem = {
  type: ActivityType;
  summary: string;
  preview?: string | null;
  actor: { id: number; name: string };
  ticket: { id: number; subject: string };
  occurred_at: string;
};

export type Dashboard = {
  role: string;
  total: number;
  counts: StatusCount[];
  unassigned?: number; // agent and admin only
  assigned_to_me?: number; // agent only
  recent_activity: ActivityItem[];
};