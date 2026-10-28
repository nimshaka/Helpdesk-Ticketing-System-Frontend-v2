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
import { EditUserForm } from "./edit-user-form";

type EditUserDialogProps = {
  userId: number;
  userName: string;
};

export function EditUserDialog({ userId, userName }: EditUserDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>Edit</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {userName}</DialogTitle>
          <DialogDescription>
            Change the name or email address. The role and status are changed from the table.
          </DialogDescription>
        </DialogHeader>
        <EditUserForm userId={userId} onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}