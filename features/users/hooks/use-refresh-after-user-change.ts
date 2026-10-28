import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ASSIGNABLE_AGENTS_QUERY_KEY } from "@/constants/query-keys";

export function useRefreshAfterUserChange() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return () => {
    // The assign-ticket dialog caches the agent list, which this change may have altered.
    void queryClient.invalidateQueries({ queryKey: ASSIGNABLE_AGENTS_QUERY_KEY });
    router.refresh(); // reload the users table from the server
  };
}