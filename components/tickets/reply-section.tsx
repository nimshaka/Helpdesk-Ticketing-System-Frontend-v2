import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClosedNotice } from "./closed-notice";
import { ReplyForm } from "./reply-form";

type ReplySectionProps = {
  ticketId: number;
  isClosed: boolean;
  canReply: boolean;
};

export function ReplySection({ ticketId, isClosed, canReply }: ReplySectionProps) {
  if (isClosed) return <ClosedNotice />;
  if (!canReply) return null; // day 7 adds "Claim this ticket to reply" for agents here

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reply</CardTitle>
      </CardHeader>
      <CardContent>
        <ReplyForm ticketId={ticketId} />
      </CardContent>
    </Card>
  );
}