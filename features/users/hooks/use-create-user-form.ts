import { useForm } from "@tanstack/react-form";
import { toFormErrors } from "@/utils/to-form-errors";
import { createUserSchema } from "../schemas";
import type { CreateUserValues } from "../types";
import { useCreateUser } from "./use-create-user";

const defaultValues: CreateUserValues = {
  name: "",
  email: "",
  password: "",
  role: "customer",
  is_active: true,
};

export function useCreateUserForm(onDone: () => void) {
  const { mutateAsync, isPending } = useCreateUser();

  const form = useForm({
    defaultValues,
    validators: {
      onChange: createUserSchema,
      onSubmitAsync: async ({ value }) => {
        try {
          await mutateAsync(value);
          return null;
        } catch (error) {
          return toFormErrors(error);
        }
      },
    },
    // Runs only when validation and the API call both succeeded.
    onSubmit: () => onDone(),
  });

  return { form, isPending };
}