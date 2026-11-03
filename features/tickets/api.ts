"use server";

import { authedRequest } from "@/lib/api/authed-request";
import { toActionError, type ActionResult } from "@/lib/api/action-result";
import type { ApiMeta } from "@/types/api";
import { TICKETS_PER_PAGE, ATTACHMENT_FIELD } from "./constants";
import type { Ticket, TicketFilters, ReplyValues, TicketDetail, AssignableAgent } from "./types";
import { ApiError } from "@/lib/api/errors";
import type { TicketStatusTarget } from "@/types/ticket";



type TicketList = { tickets: Ticket[]; meta: ApiMeta };

export async function getTickets(filters: TicketFilters): Promise<TicketList> {
  const { data, meta } = await authedRequest<Ticket[]>("/tickets", {
    query: { ...filters, per_page: TICKETS_PER_PAGE },
  });

  return {
    tickets: data,
    meta: meta ?? { current_page: 1, per_page: data.length, total: data.length, last_page: 1 },
  };
}

export async function createTicketAction(
  formData: FormData,
): Promise<ActionResult<{ id: number }>> {
  try {
    // Rebuild the body from known fields only, so nothing unexpected reaches the API.
    const body = new FormData();
    for (const field of ["subject", "description", "priority"]) {
      body.set(field, String(formData.get(field) ?? ""));
    }
    for (const file of formData.getAll(ATTACHMENT_FIELD)) {
      if (file instanceof File && file.size > 0) body.append(ATTACHMENT_FIELD, file, file.name);
    }

    const { data, message } = await authedRequest<Ticket>("/tickets", { method: "POST", body });
    return { ok: true, data: { id: data.id }, message };
  } catch (error) {
    return toActionError(error);
  }
}


export async function getTicket(id: number): Promise<TicketDetail | null> {
  try {
    const { data } = await authedRequest<TicketDetail>(`/tickets/${id}`);
    return data;
  } catch (error) {
    // 404 (missing) and 403 (not yours) both read as "not found" for the user.
    if (error instanceof ApiError && (error.status === 404 || error.status === 403)) {
      return null;
    }
    throw error;
  }
}

export async function addReplyAction(ticketId: number, values: ReplyValues): Promise<ActionResult> {
  try {
    const { message } = await authedRequest(`/tickets/${ticketId}/replies`, {
      method: "POST",
      body: values,
    });
    return { ok: true, data: null, message };
  } catch (error) {
    return toActionError(error);
  }
}


export async function claimTicketAction(ticketId: number): Promise<ActionResult> {
  try {
    const { message } = await authedRequest(`/tickets/${ticketId}/claim`, { method: "POST" });
    return { ok: true, data: null, message };
  } catch (error) {
    return toActionError(error);
  }
}

export async function changeStatusAction(
  ticketId: number,
  status: TicketStatusTarget,
): Promise<ActionResult> {
  try {
    const { message } = await authedRequest(`/tickets/${ticketId}/status`, {
      method: "PATCH",
      body: { status },
    });
    return { ok: true, data: null, message };
  } catch (error) {
    return toActionError(error);
  }
}


export async function getAssignableAgents(): Promise<AssignableAgent[]> {
  const { data } = await authedRequest<AssignableAgent[]>("/users", {
    query: { role: "agent", is_active: 1, per_page: 100 },
  });
  return data;
}

export async function assignTicketAction(ticketId: number, agentId: number): Promise<ActionResult> {
  try {
    const { message } = await authedRequest(`/tickets/${ticketId}/assign`, {
      method: "PATCH",
      body: { agent_id: agentId },
    });
    return { ok: true, data: null, message };
  } catch (error) {
    return toActionError(error);
  }
}

export async function getAttachmentLinkAction(
  ticketId: number,
  attachmentId: number,
  download: boolean,
): Promise<ActionResult<{ url: string }>> {
  try {
    // The API always wants `download`: 1 saves the file, 0 shows it in the browser.
    const { data } = await authedRequest<{ url: string }>(
      `/tickets/${ticketId}/attachments/${attachmentId}`,
      { query: { download: download ? 1 : 0 } },
    );
    return { ok: true, data: { url: data.url } };
  } catch (error) {
    return toActionError(error);
  }
}