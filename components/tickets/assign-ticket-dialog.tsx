"use client";

import { useState, type FormEvent } from "react";
import { Field } from "@/components/shared/field";
import { FormAlert } from "@/components/shared/form-alert";
import { NativeSelect } from "@/components/shared/native-select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { getErrorMessage } from "@/lib/api/action-result";
import { useAssignTicket } from "@/features/tickets/hooks/use-assign-ticket";
import { useAssignableAgents } from "@/features/tickets/hooks/use-assignable-agents";
import type { Ticket } from "@/features/tickets/types";

type AssignTicketDialogProps = {
  ticketId: number;
  currentAgent: Ticket["agent"];
  size?: "default" | "sm";
};

export function AssignTicketDialog({ ticketId, currentAgent, size = "default" }: AssignTicketDialogProps) {
  const [open, setOpen] = useState(false);
  const [agentId, setAgentId] = useState("");

  const agents = useAssignableAgents(open); // fetched only while the dialog is open
  const { mutate, isPending, error, reset } = useAssignTicket();

  const label = currentAgent ? "Reassign" : "Assign";
  // The agent who already holds the ticket is not a valid choice.
  const options = (agents.data ?? []).filter((agent) => agent.id !== currentAgent?.id);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setAgentId("");
      reset(); // forget the previous error
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutate({ ticketId, agentId: Number(agentId) }, { onSuccess: () => handleOpenChange(false) });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button variant="outline" size={size} />}>{label}</DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>
              {label} ticket #{ticketId}
            </DialogTitle>
            <DialogDescription>
              {currentAgent
                ? `Currently held by ${currentAgent.name}. Choose who should take over.`
                : "Choose the agent who should work on this ticket."}
            </DialogDescription>
          </DialogHeader>

          <FormAlert error={error ? getErrorMessage(error) : undefined} />

          {agents.isPending ? (
            <Skeleton className="h-9 w-full" />
          ) : agents.isError ? (
            <div className="flex items-center justify-between gap-3 rounded-md border border-destructive/40 p-3 text-sm">
              <span>Could not load the agents.</span>
              <Button type="button" variant="outline" size="sm" onClick={() => agents.refetch()}>
                Try again
              </Button>
            </div>
          ) : options.length === 0 ? (
            <p className="text-sm text-muted-foreground">No other active agents are available.</p>
          ) : (
            <Field id={`agent-${ticketId}`} label="Agent">
              <NativeSelect
                id={`agent-${ticketId}`}
                value={agentId}
                onChange={(event) => setAgentId(event.target.value)}
              >
                <option value="">Select an agent</option>
                {options.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name} ({agent.email})
                  </option>
                ))}
              </NativeSelect>
            </Field>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!agentId || isPending}>
              {isPending ? "Saving..." : label}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}