"use client";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import type { ApiUser } from "@/types/user";
import { useSetActive } from "@/features/users/hooks/use-set-active";

type ActiveToggleProps = {
  user: ApiUser;
  isSelf: boolean;
};

export function ActiveToggle({ user, isSelf }: ActiveToggleProps) {
  const { mutate, isPending } = useSetActive(user.id);
  const nextActive = !user.is_active;
  const label = nextActive ? "Activate" : "Deactivate";

  if (isSelf) {
    return (
      <Button variant="outline" size="sm" disabled title="You cannot deactivate your own account">
        {label}
      </Button>
    );
  }

  return (
    <ConfirmDialog
      triggerLabel={label}
      title={`${label} ${user.name}?`}
      description={
        nextActive
          ? "They will be able to use their account again."
          : "They will no longer be able to use their account. Their tickets and history are kept."
      }
      confirmLabel={label}
      destructive={!nextActive}
      isPending={isPending}
      onConfirm={(close) => mutate(nextActive, { onSuccess: close })}
    />
  );
}