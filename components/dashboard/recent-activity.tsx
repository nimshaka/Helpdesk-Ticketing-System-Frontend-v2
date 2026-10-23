import { ArrowRightLeft, MessageSquare, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/utils/format-date";
import type { ActivityItem, ActivityType } from "@/features/dashboard/types";

const ACTIVITY_ICONS: Record<ActivityType, LucideIcon> = {
    reply: MessageSquare,
    status_change: ArrowRightLeft,
};

type RecentActivityProps = {
    items: ActivityItem[];
    ticketsPath: string;
};

export function RecentActivity({ items, ticketsPath }: RecentActivityProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent activity</CardTitle>
            </CardHeader>
            <CardContent>
                {items.length === 0 ? (
                    <EmptyState
                        title="No recent activity"
                        description="Replies and status changes will show up here."
                    />
                ) : (
                    <ul className="divide-y">
                        {items.map((item, index) => {
                            const Icon = ACTIVITY_ICONS[item.type];

                            return (
                                <li
                                    key={`${item.ticket.id}-${item.occurred_at}-${index}`}
                                    className="flex gap-3 py-3 first:pt-0 last:pb-0"
                                >
                                    <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                    <div className="min-w-0 space-y-1">
                                        <p className="text-sm font-medium">{item.summary}</p>
                                        {item.preview && (
                                            <p className="line-clamp-2 text-sm text-muted-foreground">{item.preview}</p>
                                        )}
                                        <p className="text-xs text-muted-foreground">
                                            <Link
                                                href={`${ticketsPath}/${item.ticket.id}`}
                                                className="text-primary hover:underline"
                                            >
                                                #{item.ticket.id} {item.ticket.subject}
                                            </Link>{" "}
                                            · {formatDateTime(item.occurred_at)}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}