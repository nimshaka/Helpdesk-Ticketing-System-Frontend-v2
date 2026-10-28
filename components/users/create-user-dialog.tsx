"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateUserForm } from "./create-user-form";

export function CreateUserDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>New user</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New user</DialogTitle>
          <DialogDescription>Create an account for a customer, an agent or an admin.</DialogDescription>
        </DialogHeader>
        {/* The form lives inside the dialog, so it starts empty every time the dialog opens. */}
        <CreateUserForm onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}