"use server";

import { authedRequest } from "@/lib/api/authed-request";
import { toActionError, type ActionResult } from "@/lib/api/action-result";
import type { ApiMeta } from "@/types/api";
import { TICKETS_PER_PAGE } from "./constants";
import type { CreateTicketValues, Ticket, TicketFilters, ReplyValues, TicketDetail } from "./types";
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
  values: CreateTicketValues,
): Promise<ActionResult<{ id: number }>> {
  try {
    const { data, message } = await authedRequest<Ticket>("/tickets", {
      method: "POST",
      body: values,
    });
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