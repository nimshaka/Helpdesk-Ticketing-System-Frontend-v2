import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage, unwrap } from "@/lib/api/action-result";
import type { UserRole } from "@/types/user";
import { setUserRoleAction } from "../api";
import { useRefreshAfterUserChange } from "./use-refresh-after-user-change";

export function useSetRole(userId: number) {
  const refresh = useRefreshAfterUserChange();

  return useMutation({
    mutationFn: async (role: UserRole) => unwrap(await setUserRoleAction(userId, role)),
    onSuccess: ({ message }) => toast.success(message || "Role updated"),
    onError: (error) => toast.error(getErrorMessage(error)),
    onSettled: refresh, // show the latest state whether it worked or not
  });
}