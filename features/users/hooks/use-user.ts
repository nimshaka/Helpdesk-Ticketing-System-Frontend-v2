import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api";
import { userQueryKey } from "../constants";

export function useUser(id: number) {
  return useQuery({
    queryKey: userQueryKey(id),
    // Wrapped on purpose: Query would pass its context object to a server action.
    queryFn: () => getUser(id),
    gcTime: 0, // never reuse an old copy: every time the dialog opens we want fresh data
  });
}