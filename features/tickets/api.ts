"use server";

import { authedRequest } from "@/lib/api/authed-request";
import { toActionError, type ActionResult } from "@/lib/api/action-result";
import type { ApiMeta } from "@/types/api";
import { TICKETS_PER_PAGE } from "./constants";
import type { CreateTicketValues, Ticket, TicketFilters } from "./types";

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