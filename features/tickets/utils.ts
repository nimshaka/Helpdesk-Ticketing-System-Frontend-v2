import { TICKET_PRIORITIES, TICKET_STATUSES, CLOSED_TICKET_STATUS} from "@/constants/ticket";
import { TICKET_ASSIGNMENTS } from "./constants";
import type { TicketFilters } from "./types";
import {  } from "@/constants/ticket";
import type { Ticket, TicketViewer } from "./types";
import { parsePage } from "@/utils/parse-page"
import { ATTACHMENT_FIELD } from "./constants";
import type { CreateTicketValues } from "./types";




export function parseTicketFilters(params: Record<string, string | undefined>): TicketFilters {
  return {
    search: params.search?.trim() || undefined,
    status: TICKET_STATUSES.find((status) => status === params.status),
    priority: TICKET_PRIORITIES.find((priority) => priority === params.priority),
    assignment: TICKET_ASSIGNMENTS.find((assignment) => assignment === params.assignment),
    page: parsePage(params.page),
  };
}



export function parseTicketId(value: string): number | null {
  return /^\d+$/.test(value) ? Number(value) : null;
}

export function isTicketClosed(ticket: Pick<Ticket, "status">): boolean {
  return ticket.status.value === CLOSED_TICKET_STATUS;
}

/** Mirrors the brief: customers reply on their own tickets, agents on tickets they hold, admins anywhere. Closed tickets accept no replies. */
export function canReplyToTicket(viewer: TicketViewer, ticket: Ticket): boolean {
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


/** Nobody holds it and it is still open for work. */
export function isUnclaimed(ticket: Ticket): boolean {
  return ticket.agent === null && !isTicketClosed(ticket);
}

export function canClaimTicket(viewer: TicketViewer, ticket: Ticket): boolean {
  return viewer.role === "agent" && isUnclaimed(ticket);
}

/** Admins may change any open ticket, agents only the tickets they hold. Customers never. */
export function canChangeStatus(viewer: TicketViewer, ticket: Ticket): boolean {
  if (isTicketClosed(ticket)) return false;
  if (viewer.role === "admin") return true;
  return viewer.role === "agent" && ticket.agent?.id === viewer.id;
}


export function canAssignTicket(viewer: TicketViewer, ticket: Ticket): boolean {
  return viewer.role === "admin" && !isTicketClosed(ticket);
}


export function fileKey(file: File): string {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

/** Adds newly chosen files, skipping the ones that are already in the list. */
export function mergeFiles(current: File[], incoming: File[]): File[] {
  const known = new Set(current.map(fileKey));
  return [...current, ...incoming.filter((file) => !known.has(fileKey(file)))];
}

/** Files cannot travel as JSON, so the create form is sent as multipart FormData. */
export function buildCreateTicketFormData(values: CreateTicketValues): FormData {
  const formData = new FormData();
  formData.set("subject", values.subject.trim());
  formData.set("description", values.description.trim());
  formData.set("priority", values.priority);
  for (const file of values.attachments) formData.append(ATTACHMENT_FIELD, file);
  return formData;
}

export function getAttachmentHref(
  ticketId: number,
  attachmentId: number,
  { download = false } = {},
): string {
  const path = `/api/tickets/${ticketId}/attachments/${attachmentId}`;
  return download ? `${path}?download=1` : path;
}