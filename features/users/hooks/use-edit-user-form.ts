import { useForm } from "@tanstack/react-form";
import type { ApiUser } from "@/types/user";
import { toFormErrors } from "@/utils/to-form-errors";
import { editUserSchema } from "../schemas";
import type { EditUserValues } from "../types";
import { getUserChanges } from "../utils";
import { useUpdateUser } from "./use-update-user";

export function useEditUserForm(user: ApiUser, onDone: () => void) {
  const { mutateAsync, isPending } = useUpdateUser(user.id);
  const defaultValues: EditUserValues = { name: user.name, email: user.email };

  const form = useForm({
    defaultValues,
    validators: {
      onChange: editUserSchema,
      onSubmitAsync: async ({ value }) => {
        const changes = getUserChanges(user, value);
        if (Object.keys(changes).length === 0) return null; // nothing to save

        try {
          await mutateAsync(changes);
          return null;
        } catch (error) {
          return toFormErrors(error);
        }
      },
    },
    onSubmit: () => onDone(),
  });

  return { form, isPending };
}