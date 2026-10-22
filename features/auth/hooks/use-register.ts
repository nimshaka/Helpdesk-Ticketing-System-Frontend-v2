import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { unwrap } from "@/lib/api/action-result";
import { registerAction } from "../api";
import type {RegisterValues } from "../types";
import { toast } from "sonner";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: RegisterValues) => unwrap(await registerAction(values)),
    onSuccess: (result) => {
      toast.success(result.message || "Account created. Please sign in.");
      router.replace("/login"); 
      router.refresh();
    },
  });
}