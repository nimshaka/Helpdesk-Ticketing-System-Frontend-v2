import Link from "next/link";
import { NativeSelect } from "@/components/shared/native-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TICKET_PRIORITIES,
  TICKET_PRIORITY_LABELS,
  TICKET_STATUSES,
  TICKET_STATUS_LABELS,
} from "@/constants/ticket";
import { cn } from "@/utils/cn";
import { withSearchParams } from "@/utils/with-search-params";
import { TICKET_ASSIGNMENT_LABELS } from "@/features/tickets/constants";
import type { TicketAssignment, TicketFilters } from "@/features/tickets/types";

type TicketFilterBarProps = {
  basePath: string;
  filters: TicketFilters;
  /** Shows an "Assignment" select with these choices (admin). Without it, the active `assignment` is kept as is (agent tabs). */
  assignmentOptions?: readonly TicketAssignment[];
};

export function TicketFilterBar({ basePath, filters, assignmentOptions }: TicketFilterBarProps) {
  const hasFilters = Boolean(
    filters.search || filters.status || filters.priority || (assignmentOptions && filters.assignment),
  );

  return (
    // A plain GET form: submitting it puts the values in the URL. The `key` remounts
    // the form whenever the URL filters change, so the inputs show the new values.
    <form
      key={`${filters.search}-${filters.status}-${filters.priority}-${filters.assignment}`}
      method="get"
      action={basePath}
      className={cn(
        "mb-6 grid gap-4 rounded-md border p-4 sm:grid-cols-2 lg:items-end",
        assignmentOptions ? "lg:grid-cols-[2fr_1fr_1fr_1fr_auto]" : "lg:grid-cols-[2fr_1fr_1fr_auto]",
      )}
    >
      {/* Keep the active agent tab when the filters are submitted. */}
      {!assignmentOptions && filters.assignment && (
        <input type="hidden" name="assignment" value={filters.assignment} />
      )}

      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input id="search" name="search" type="search" placeholder="Search tickets" defaultValue={filters.search} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <NativeSelect id="status" name="status" defaultValue={filters.status ?? ""}>
          <option value="">All statuses</option>
          {TICKET_STATUSES.map((status) => (
            <option key={status} value={status}>
              {TICKET_STATUS_LABELS[status]}
            </option>
          ))}
        </NativeSelect>
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <NativeSelect id="priority" name="priority" defaultValue={filters.priority ?? ""}>
          <option value="">All priorities</option>
          {TICKET_PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {TICKET_PRIORITY_LABELS[priority]}
            </option>
          ))}
        </NativeSelect>
      </div>

      {assignmentOptions && (
        <div className="space-y-2">
          <Label htmlFor="assignment">Assignment</Label>
          <NativeSelect id="assignment" name="assignment" defaultValue={filters.assignment ?? ""}>
            <option value="">All tickets</option>
            {assignmentOptions.map((option) => (
              <option key={option} value={option}>
                {TICKET_ASSIGNMENT_LABELS[option]}
              </option>
            ))}
          </NativeSelect>
        </div>
      )}

      <div className="flex gap-2">
        <Button type="submit">Filter</Button>
        {hasFilters && (
          <Button
            variant="outline"
            render={<Link href={withSearchParams(basePath, { assignment: assignmentOptions ? undefined : filters.assignment })} />}
            nativeButton={false}
          >
            Clear
          </Button>
        )}
      </div>
    </form>
  );
}