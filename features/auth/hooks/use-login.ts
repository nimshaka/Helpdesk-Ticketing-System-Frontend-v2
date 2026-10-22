import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { unwrap } from "@/lib/api/action-result";
import { loginAction } from "../api";
import type { LoginValues } from "../types";
import { toast } from "sonner";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: LoginValues) => unwrap(await loginAction(values)),
    onSuccess: (result) => {
      toast.success(result.message || "Signed in successfully");
      router.replace("/dashboard"); 
      router.refresh();
    },
  });
}