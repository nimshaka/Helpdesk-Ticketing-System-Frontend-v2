import { TICKET_STATUS_STYLES , TICKET_STATUSES} from "@/constants/ticket";
import type { Dashboard } from "@/features/dashboard/types";
import { RecentActivity } from "./recent-activity";
import { StatCard } from "./stat-card";


type DashboardViewProps = {
  dashboard: Dashboard;
  ticketsPath: string; 
};

export function DashboardView({ dashboard, ticketsPath }: DashboardViewProps) {
  const { counts, unassigned, assigned_to_me, recent_activity } = dashboard;
  const orderedCounts = [...counts].sort(
  (a, b) => TICKET_STATUSES.indexOf(a.status) - TICKET_STATUSES.indexOf(b.status),
);
  const hasAssignmentCards = unassigned !== undefined || assigned_to_me !== undefined;

  return (
    <div className="space-y-6">
      <section aria-label="Tickets by status" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {orderedCounts.map(({ status, label, count }) => (
          <StatCard
            key={status}
            label={label}
            value={count}
            href={`${ticketsPath}?status=${status}`}
            className={TICKET_STATUS_STYLES[status]}
          />
        ))}
      </section>

      {hasAssignmentCards && (
        <section aria-label="Assignment" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {unassigned !== undefined && (
            <StatCard
              label="Unassigned"
              value={unassigned}
              href={`${ticketsPath}?assignment=unassigned`}
            />
          )}
          {assigned_to_me !== undefined && (
            <StatCard
              label="Assigned to me"
              value={assigned_to_me}
              href={`${ticketsPath}?assignment=mine`}
            />
          )}
        </section>
      )}

      <RecentActivity items={recent_activity} ticketsPath={ticketsPath} />
    </div>
  );
}