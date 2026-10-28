import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/utils/format-date";
import type { AssignmentHistoryEntry } from "@/features/tickets/types";

export function AssignmentHistory({ entries }: { entries: AssignmentHistoryEntry[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignment history</CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground">This ticket has not been assigned yet.</p>
        ) : (
          <ol className="space-y-4 border-l pl-4">
            {entries.map((entry) => (
              <li key={`${entry.agent.id}-${entry.assigned_at}`} className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium">{entry.agent.name}</span>
                  {entry.unassigned_at === null && <Badge variant="secondary">Current</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">
                  From {formatDateTime(entry.assigned_at)}
                  {entry.unassigned_at && ` until ${formatDateTime(entry.unassigned_at)}`}
                </p>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}