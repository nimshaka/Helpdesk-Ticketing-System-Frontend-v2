export const CUSTOMER_TICKETS_PATH = "/customer/tickets";
export const AGENT_TICKETS_PATH = "/agent/tickets";
export const ADMIN_TICKETS_PATH = "/admin/tickets";
export const TICKETS_PER_PAGE = 10;
export const TICKET_ASSIGNMENTS = ["unassigned", "mine"] as const; // used by agent/admin lists later


export const TICKET_ASSIGNMENT_LABELS: Record<(typeof TICKET_ASSIGNMENTS)[number], string> = {
  unassigned: "Unassigned",
  mine: "Assigned to me",
};
