import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/utils/format-date";
import type { StatusHistoryEntry } from "@/features/tickets/types";
import { StatusBadge } from "./status-badge";

export function StatusHistory({ entries }: { entries: StatusHistoryEntry[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status history</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-4 border-l pl-4">
          {entries.map((entry) => (
            <li key={entry.id} className="space-y-1">
              <div className="flex flex-wrap items-center gap-1.5">
                {entry.from && (
                  <>
                    <StatusBadge status={entry.from} />
                    <ArrowRight className="size-3 text-muted-foreground" />
                  </>
                )}
                <StatusBadge status={entry.to} />
              </div>
              <p className="text-xs text-muted-foreground">
                {entry.from ? "Changed" : "Created"} by {entry.changed_by.name} ·{" "}
                {formatDateTime(entry.created_at)}
              </p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}