import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { requireRole } from "@/features/auth/utils";
import { CreateTicketForm } from "@/components/tickets/create-ticket-form";

export const metadata: Metadata = { title: "New ticket" };

export default async function NewTicketPage() {
  await requireRole("customer");

  return (
    <>
      <PageHeader title="New ticket" description="Tell us what you need help with." />
      <Card className="max-w-2xl">
        <CardContent>
          <CreateTicketForm />
        </CardContent>
      </Card>
    </>
  );
}