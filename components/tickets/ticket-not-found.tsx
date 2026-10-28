import { SearchX } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

export function TicketNotFound({ backHref }: { backHref: string }) {
  return (
    <EmptyState
      icon={SearchX}
      title="Ticket not found"
      description="It may not exist, or you may not have access to it."
      action={
        <Button variant="outline" render={<Link href={backHref} />} nativeButton={false}>
          Back to tickets
        </Button>
      }
    />
  );
}