import type { Metadata } from "next";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Pagination } from "@/components/shared/pagination";
import { requireRole } from "@/features/auth/utils";
import { getUsers } from "@/features/users/api";
import { CreateUserDialog } from "@/components/users/create-user-dialog";
import { UserFilterBar } from "@/components/users/user-filter-bar";
import { UserTable } from "@/components/users/user-table";
import { USERS_PATH } from "@/features/users/constants";
import { parseUserFilters } from "@/features/users/utils";
import { normalizeSearchParams } from "@/utils/normalize-search-params";

export const metadata: Metadata = { title: "Users" };

type AdminUsersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
  const admin = await requireRole("admin");

  const filters = parseUserFilters(normalizeSearchParams(await searchParams));
  const { users, meta } = await getUsers(filters);
  const hasFilters = Boolean(filters.search || filters.role || filters.is_active);

  return (
    <>
      <PageHeader
        title="Users"
        description="Create accounts and manage roles and access."
        actions={<CreateUserDialog />}
      />
      <UserFilterBar basePath={USERS_PATH} filters={filters} />

      {users.length === 0 ? (
        <EmptyState
          title={hasFilters ? "No users match your filters" : "No users yet"}
          description={hasFilters ? "Try a different search, or clear the filters." : "Create the first user to get started."}
        />
      ) : (
        <>
          <UserTable users={users} currentUserId={admin.id} />
          <Pagination
            meta={meta}
            pathname={USERS_PATH}
            searchParams={{ search: filters.search, role: filters.role, is_active: filters.is_active }}
          />
        </>
      )}
    </>
  );
}