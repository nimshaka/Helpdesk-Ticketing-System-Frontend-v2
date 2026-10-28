import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { unwrap } from "@/lib/api/action-result";
import { createUserAction } from "../api";
import type { CreateUserValues } from "../types";
import { useRefreshAfterUserChange } from "./use-refresh-after-user-change";

export function useCreateUser() {
  const refresh = useRefreshAfterUserChange();

  return useMutation({
    mutationFn: async (values: CreateUserValues) => unwrap(await createUserAction(values)),
    onSuccess: ({ message }) => {
      toast.success(message || "User created");
      refresh();
    },
  });
}