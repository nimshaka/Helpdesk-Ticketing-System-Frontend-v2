import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { unwrap } from "@/lib/api/action-result";
import { registerAction } from "../api";
import type {RegisterValues } from "../types";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: RegisterValues) => unwrap(await registerAction(values)),
    onSuccess: () => {
      router.replace("/dashboard"); 
      router.refresh();
    },
  });
}