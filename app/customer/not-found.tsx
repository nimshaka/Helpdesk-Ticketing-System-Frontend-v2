import { SearchX } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { CUSTOMER_TICKETS_PATH } from "@/features/tickets/constants";

export default function CustomerNotFound() {
  return (
    <EmptyState
      icon={SearchX}
      title="Ticket not found"
      description="It may not exist, or you may not have access to it."
      action={
        <Button variant="outline" render={<Link href={CUSTOMER_TICKETS_PATH} />} nativeButton={false}>
          Back to my tickets
        </Button>
      }
    />
  );
}