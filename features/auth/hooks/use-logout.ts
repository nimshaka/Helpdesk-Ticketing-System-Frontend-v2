import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type LogoutResponse = { message: string };

async function logoutRequest(): Promise<LogoutResponse> {
  const response = await fetch("/api/auth/logout", { method: "POST" });
  if (!response.ok) throw new Error("Could not sign out. Please try again.");
  return response.json();
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: ({ message }) => {
      queryClient.clear(); 
      toast.success(message || "Logged out");
      router.replace("/login");
      router.refresh();
    },
    onError: (error) => toast.error(error.message),
  });
}