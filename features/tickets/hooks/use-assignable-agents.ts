import { useQuery } from "@tanstack/react-query";
import { getAssignableAgents } from "../api";
import { ASSIGNABLE_AGENTS_QUERY_KEY } from "@/constants/query-keys";

export function useAssignableAgents(enabled: boolean) {
  return useQuery({
    queryKey: ASSIGNABLE_AGENTS_QUERY_KEY,
    // Wrapped on purpose: Query would pass its context object to a server action.
    queryFn: () => getAssignableAgents(),
    enabled,
  });
}