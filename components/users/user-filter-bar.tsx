import Link from "next/link";
import { NativeSelect } from "@/components/shared/native-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USER_ROLES, USER_ROLE_LABELS } from "@/constants/roles";
import { USER_ACTIVE_FILTERS, USER_ACTIVE_FILTER_LABELS } from "@/features/users/constants";
import type { UserFilters } from "@/features/users/types";

type UserFilterBarProps = {
  basePath: string;
  filters: UserFilters;
};

export function UserFilterBar({ basePath, filters }: UserFilterBarProps) {
  const hasFilters = Boolean(filters.search || filters.role || filters.is_active);

  return (
    // A plain GET form: submitting it puts the values in the URL. The `key` remounts
    // the form whenever the URL filters change, so the inputs show the new values.
    <form
      key={`${filters.search}-${filters.role}-${filters.is_active}`}
      method="get"
      action={basePath}
      className="mb-6 grid gap-4 rounded-md border p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto] lg:items-end"
    >
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          name="search"
          type="search"
          placeholder="Search by name or email"
          defaultValue={filters.search}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <NativeSelect id="role" name="role" defaultValue={filters.role ?? ""}>
          <option value="">All roles</option>
          {USER_ROLES.map((role) => (
            <option key={role} value={role}>
              {USER_ROLE_LABELS[role]}
            </option>
          ))}
        </NativeSelect>
      </div>

      <div className="space-y-2">
        <Label htmlFor="is_active">Status</Label>
        <NativeSelect id="is_active" name="is_active" defaultValue={filters.is_active ?? ""}>
          <option value="">All</option>
          {USER_ACTIVE_FILTERS.map((value) => (
            <option key={value} value={value}>
              {USER_ACTIVE_FILTER_LABELS[value]}
            </option>
          ))}
        </NativeSelect>
      </div>

      <div className="flex gap-2">
        <Button type="submit">Filter</Button>
        {hasFilters && (
          <Button variant="outline" render={<Link href={basePath} />} nativeButton={false}>
            Clear
          </Button>
        )}
      </div>
    </form>
  );
}