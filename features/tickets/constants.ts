export const CUSTOMER_TICKETS_PATH = "/customer/tickets";
export const AGENT_TICKETS_PATH = "/agent/tickets";
export const ADMIN_TICKETS_PATH = "/admin/tickets";
export const TICKETS_PER_PAGE = 10;
export const TICKET_ASSIGNMENTS = ["unassigned", "mine"] as const; // used by agent/admin lists later


export const TICKET_ASSIGNMENT_LABELS: Record<(typeof TICKET_ASSIGNMENTS)[number], string> = {
  unassigned: "Unassigned",
  mine: "Assigned to me",
};


// Keep these in line with the Laravel validation rules for attachments.
export const ATTACHMENT_FIELD = "attachments[]";
export const ATTACHMENT_MAX_FILES = 5;
export const ATTACHMENT_MAX_SIZE_BYTES = 5 * 1024 * 1024;
export const ATTACHMENT_ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
] as const;
export const ATTACHMENT_ACCEPT_ATTRIBUTE = ATTACHMENT_ACCEPTED_TYPES.join(",");