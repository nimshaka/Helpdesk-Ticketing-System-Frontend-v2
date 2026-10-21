import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { registerSchema } from "../schemas";
import type { RegisterValues } from "../types";
import { useRegister } from "./use-register";

const defaultValues: RegisterValues = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export function useRegisterForm() {
  const { mutate, isPending } = useRegister();

  const form = useForm({
    defaultValues,
    validators: { onChange: registerSchema },
    onSubmit: ({ value }) => {
      mutate(value, { onSuccess: () => toast.success("Form is valid (UI only)") });
    },
  });

  return { form, isPending };
}