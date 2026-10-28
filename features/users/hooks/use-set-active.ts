import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage, unwrap } from "@/lib/api/action-result";
import { setUserActiveAction } from "../api";
import { useRefreshAfterUserChange } from "./use-refresh-after-user-change";

export function useSetActive(userId: number) {
  const refresh = useRefreshAfterUserChange();

  return useMutation({
    mutationFn: async (isActive: boolean) => unwrap(await setUserActiveAction(userId, isActive)),
    onSuccess: ({ message }) => toast.success(message || "User updated"),
    onError: (error) => toast.error(getErrorMessage(error)),
    onSettled: refresh,
  });
}