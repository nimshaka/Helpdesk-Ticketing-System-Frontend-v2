import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { unwrap } from "@/lib/api/action-result";
import { updateUserAction } from "../api";
import type { UpdateUserChanges } from "../types";
import { useRefreshAfterUserChange } from "./use-refresh-after-user-change";

export function useUpdateUser(userId: number) {
  const refresh = useRefreshAfterUserChange();

  return useMutation({
    mutationFn: async (changes: UpdateUserChanges) => unwrap(await updateUserAction(userId, changes)),
    onSuccess: ({ message }) => {
      toast.success(message || "User updated");
      refresh();
    },
  });
}