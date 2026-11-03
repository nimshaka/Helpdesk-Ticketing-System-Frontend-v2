import { FileText, ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/utils/format-date";
import { formatFileSize } from "@/utils/format-file-size";
import type { TicketAttachment } from "@/features/tickets/types";
import { AttachmentActions } from "./attachment-actions";

type AttachmentListProps = {
  ticketId: number;
  attachments: TicketAttachment[];
};

export function AttachmentList({ ticketId, attachments }: AttachmentListProps) {
  if (attachments.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attachments ({attachments.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 sm:grid-cols-2">
          {attachments.map((attachment) => {
            const Icon = attachment.is_image ? ImageIcon : FileText;

            return (
              <li key={attachment.id} className="flex items-start gap-3 rounded-md border p-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded bg-secondary">
                  <Icon className="size-6 text-primary" />
                </div>

                <div className="min-w-0 flex-1 space-y-3">
                  <div className="space-y-1">
                    <p className="truncate text-sm font-medium" title={attachment.name}>
                      {attachment.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(attachment.size_bytes)} · {attachment.uploaded_by.name} ·{" "}
                      {formatDateTime(attachment.created_at)}
                    </p>
                  </div>
                  <AttachmentActions ticketId={ticketId} attachmentId={attachment.id} />
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}