import { useForm } from "@tanstack/react-form";
import { toFormErrors } from "@/utils/to-form-errors";
import { loginSchema } from "../schemas";
import type { LoginValues } from "../types";
import { useLogin } from "./use-login";

const defaultValues: LoginValues = { email: "", password: "" };

export function useLoginForm() {
  const { mutateAsync, isPending } = useLogin();

  const form = useForm({
    defaultValues,
    validators: {
      onChange: loginSchema,
      onSubmitAsync: async ({ value }) => {
        try {
          await mutateAsync(value);
          return null;
        } catch (error) {
          return toFormErrors(error);
        }
      },
    },
  });

  return { form, isPending };
}