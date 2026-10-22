import { useForm } from "@tanstack/react-form";
import { toFormErrors } from "@/utils/to-form-errors";
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
  const { mutateAsync, isPending } = useRegister();

  const form = useForm({
    defaultValues,
    validators: {
      onChange: registerSchema,
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