import { useMutation } from "@tanstack/react-query";
import type { RegisterValues } from "../types";

export function useRegister() {
  return useMutation({
    mutationFn: async (values: RegisterValues) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return values;
    },
  });
}