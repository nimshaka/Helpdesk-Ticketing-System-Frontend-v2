"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { DataTable } from "@/components/shared/data-table";
import { formatDateTime } from "@/utils/format-date";
import type { Ticket } from "@/features/tickets/types";
import { isUnclaimed } from "@/features/tickets/utils";
import { ClaimButton } from "./claim-button";
import { PriorityBadge } from "./priority-badge";
import { StatusBadge } from "./status-badge";

type TicketTableProps = {
  tickets: Ticket[];
  basePath: string; // "/customer/tickets", "/agent/tickets" or "/admin/tickets"
  showClaim?: boolean; // agents get a Claim button on unassigned rows
};

function getColumns(basePath: string, showClaim: boolean): ColumnDef<Ticket>[] {
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

  return columns;
}

export function TicketTable({ tickets, basePath, showClaim = false }: TicketTableProps) {
  // TanStack Table expects a stable `columns` reference, so we memoize it.
  const columns = useMemo(() => getColumns(basePath, showClaim), [basePath, showClaim]);

  return <DataTable columns={columns} data={tickets} />;
}