"use client";

import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOpenAttachment } from "@/features/tickets/hooks/use-open-attachment";

type AttachmentActionsProps = {
  ticketId: number;
  attachmentId: number;
};

export function AttachmentActions({ ticketId, attachmentId }: AttachmentActionsProps) {
  const { open, isPending, mode } = useOpenAttachment(ticketId, attachmentId);

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" disabled={isPending} onClick={() => open("view")}>
        <ExternalLink />
        {isPending && mode === "view" ? "Opening..." : "View"}
      </Button>
      <Button variant="outline" size="sm" disabled={isPending} onClick={() => open("download")}>
        <Download />
        {isPending && mode === "download" ? "Preparing..." : "Download"}
      </Button>
    </div>
  );
}