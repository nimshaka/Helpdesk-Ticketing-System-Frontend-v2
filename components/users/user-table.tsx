"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import type { ApiUser } from "@/types/user";
import { formatDateTime } from "@/utils/format-date";
import { ActiveToggle } from "./active-toggle";
import { EditUserDialog } from "./edit-user-dialog";
import { RoleSelect } from "./role-select";
import { UserStatusBadge } from "./user-status-badge";

type UserTableProps = {
  users: ApiUser[];
  currentUserId: number;
};

function getColumns(currentUserId: number): ColumnDef<ApiUser>[] {
  return [
    {
      id: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.original.name}</span>
          {row.original.id === currentUserId && <Badge variant="secondary">You</Badge>}
        </div>
      ),
    },
    { id: "email", header: "Email", cell: ({ row }) => row.original.email },
    {
      id: "role",
      header: "Role",
      cell: ({ row }) => <RoleSelect user={row.original} disabled={row.original.id === currentUserId} />,
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => <UserStatusBadge isActive={row.original.is_active} />,
    },
    {
      id: "created_at",
      header: "Created",
      cell: ({ row }) => formatDateTime(row.original.created_at),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <EditUserDialog userId={row.original.id} userName={row.original.name} />
          <ActiveToggle user={row.original} isSelf={row.original.id === currentUserId} />
        </div>
      ),
    },
  ];
}

export function UserTable({ users, currentUserId }: UserTableProps) {
  // TanStack Table expects a stable `columns` reference, so we memoize it.
  const columns = useMemo(() => getColumns(currentUserId), [currentUserId]);

  return <DataTable columns={columns} data={users} />;
}