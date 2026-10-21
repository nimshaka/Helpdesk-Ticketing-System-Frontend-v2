import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { loginSchema } from "../schemas";
import type { LoginValues } from "../types";
import { useLogin } from "./use-login";

const defaultValues: LoginValues = { email: "", password: "" };

export function useLoginForm() {
  const { mutate, isPending } = useLogin();

  const form = useForm({
    defaultValues,
    validators: { onChange: loginSchema },
    onSubmit: ({ value }) => {
      mutate(value, { onSuccess: () => toast.success("Form is valid (UI only)") });
    },
  });

  return { form, isPending };
}