import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClosedNotice } from "./closed-notice";
import { ReplyForm } from "./reply-form";

type ReplySectionProps = {
  ticketId: number;
  isClosed: boolean;
  canReply: boolean;
  canClaim: boolean;
};

export function ReplySection({ ticketId, isClosed, canReply, canClaim }: ReplySectionProps) {
  if (isClosed) return <ClosedNotice />;

  if (canReply) {
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

  if (canClaim) {
    return (
      <Alert>
        <Info />
        <AlertTitle>Claim this ticket to reply</AlertTitle>
        <AlertDescription>
          You can reply and change the status once the ticket is assigned to you.
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}