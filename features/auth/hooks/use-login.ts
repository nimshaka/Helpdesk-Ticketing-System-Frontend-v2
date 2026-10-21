import { useMutation } from "@tanstack/react-query";
import type { LoginValues } from "../types";

export function useLogin() {
  return useMutation({
    mutationFn: async (values: LoginValues) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return values;
    },
  });
}