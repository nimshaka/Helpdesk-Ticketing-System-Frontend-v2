export const TICKET_PRIORITIES = ["low", "medium", "high"] as const;
export const TICKET_STATUSES = [
  "open",
  "in_progress",
  "waiting_for_customer",
  "resolved",
] as const;

export const TICKET_STATUS_STYLES: Record<(typeof TICKET_STATUSES)[number], string> = {
  open: "border-blue-200 bg-blue-50 text-blue-700",
  in_progress: "border-amber-200 bg-amber-50 text-amber-700",
  waiting_for_customer: "border-purple-200 bg-purple-50 text-purple-700",
  resolved: "border-green-200 bg-green-50 text-green-700",
};

export const TICKET_PRIORITY_STYLES: Record<(typeof TICKET_PRIORITIES)[number], string> = {
  low: "border-slate-200 bg-slate-50 text-slate-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  high: "border-red-200 bg-red-50 text-red-700",
};


export const TICKET_STATUS_LABELS: Record<(typeof TICKET_STATUSES)[number], string> = {
  open: "Open",
  in_progress: "In Progress",
  waiting_for_customer: "Waiting for Customer",
  resolved: "Resolved",
};

export const TICKET_PRIORITY_LABELS: Record<(typeof TICKET_PRIORITIES)[number], string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const CLOSED_TICKET_STATUS = "resolved" as const;


// Statuses a person may set by hand (open → in progress happens by claim or assign).
export const SETTABLE_STATUSES = ["waiting_for_customer", "resolved"] as const;

// The ticket flow from the brief: which statuses can be set from each status.
export const TICKET_STATUS_TARGETS: Record<
  (typeof TICKET_STATUSES)[number],
  readonly (typeof SETTABLE_STATUSES)[number][]
> = {
  open: [],
  in_progress: ["waiting_for_customer", "resolved"],
  waiting_for_customer: ["resolved"],
  resolved: [],
};

export const STATUS_ACTION_LABELS: Record<(typeof SETTABLE_STATUSES)[number], string> = {
  waiting_for_customer: "Mark as waiting for customer",
  resolved: "Mark as resolved",
};
