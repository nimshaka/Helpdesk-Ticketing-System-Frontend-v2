"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { DataTable } from "@/components/shared/data-table";
import { formatDateTime } from "@/utils/format-date";
import type { Ticket } from "@/features/tickets/types";
import { isTicketClosed, isUnclaimed } from "@/features/tickets/utils";
import { AssignTicketDialog } from "./assign-ticket-dialog";
import { ClaimButton } from "./claim-button";
import { PriorityBadge } from "./priority-badge";
import { StatusBadge } from "./status-badge";

type TicketTableProps = {
  tickets: Ticket[];
  basePath: string; // "/customer/tickets", "/agent/tickets" or "/admin/tickets"
  showClaim?: boolean; // agents: a Claim button on unassigned rows
  showAssign?: boolean; // admins: an Assign / Reassign button on open rows
};

type ColumnOptions = Pick<TicketTableProps, "basePath" | "showClaim" | "showAssign">;

function getColumns({ basePath, showClaim, showAssign }: ColumnOptions): ColumnDef<Ticket>[] {
  const columns: ColumnDef<Ticket>[] = [
    { id: "id", header: "#", cell: ({ row }) => `#${row.original.id}` },
    {
      id: "subject",
      header: "Subject",
      cell: ({ row }) => (
        <Link href={`${basePath}/${row.original.id}`} className="font-medium text-primary hover:underline">
          {row.original.subject}
        </Link>
      ),
    },
    { id: "priority", header: "Priority", cell: ({ row }) => <PriorityBadge priority={row.original.priority} /> },
    { id: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} /> },
    {
      id: "agent",
      header: "Agent",
      cell: ({ row }) =>
        row.original.agent?.name ?? <span className="text-muted-foreground">Unassigned</span>,
    },
    {
      id: "last_activity_at",
      header: "Last activity",
      cell: ({ row }) => formatDateTime(row.original.last_activity_at),
    },
  ];

  if (showClaim) {
    columns.push({
      id: "actions",
      header: "",
      cell: ({ row }) =>
        isUnclaimed(row.original) ? <ClaimButton ticketId={row.original.id} size="sm" /> : null,
    });
  }

  if (showAssign) {
    columns.push({
      id: "actions",
      header: "",
      // Resolved tickets are closed: no assignment, so no button.
      cell: ({ row }) =>
        isTicketClosed(row.original) ? null : (
          <AssignTicketDialog ticketId={row.original.id} currentAgent={row.original.agent} size="sm" />
        ),
    });
  }

  return columns;
}

export function TicketTable({ tickets, basePath, showClaim = false, showAssign = false }: TicketTableProps) {
  // TanStack Table expects a stable `columns` reference, so we memoize it.
  const columns = useMemo(
    () => getColumns({ basePath, showClaim, showAssign }),
    [basePath, showClaim, showAssign],
  );

  return <DataTable columns={columns} data={tickets} />;
}