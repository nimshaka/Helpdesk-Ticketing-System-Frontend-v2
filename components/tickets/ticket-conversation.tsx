import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/cn";
import { formatDateTime } from "@/utils/format-date";
import type { TicketReply } from "@/features/tickets/types";

type TicketConversationProps = {
  isClosed: boolean;
};

export function TicketConversation({ replies, isClosed }: { replies: TicketReply[] } & TicketConversationProps) {
  return (
    <section aria-labelledby="conversation-title" className="space-y-3">
      <h2 id="conversation-title" className="text-lg font-semibold">
        Conversation
      </h2>

      {replies.length === 0 ?(
        !isClosed && (
        <p className="text-sm text-muted-foreground">No replies yet.</p>
         )
      ) : (
        <ul className="space-y-3">
          {replies.map((reply) => (
            <li key={reply.id}>
              {/* Staff replies get a tint so the two sides are easy to tell apart. */}
              <Card className={cn(reply.author.role !== "customer" && "border-primary/30 bg-secondary/40")}>
                <CardContent className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-medium">{reply.author.name}</span>
                    <Badge variant="secondary" className="capitalize">
                      {reply.author.role}
                    </Badge>
                    <time dateTime={reply.created_at} className="text-xs text-muted-foreground">
                      {formatDateTime(reply.created_at)}
                    </time>
                  </div>
                  <p className="whitespace-pre-wrap break-words text-sm">{reply.body}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
      {isClosed && (
        <p
          role="status"
          className="rounded-md border border-dashed py-3 text-center text-sm text-muted-foreground"
        >
          Conversation closed
        </p>
      )}
    </section>
  );
}