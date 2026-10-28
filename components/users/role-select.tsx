"use client";

import { NativeSelect } from "@/components/shared/native-select";
import { USER_ROLES, USER_ROLE_LABELS } from "@/constants/roles";
import type { ApiUser, UserRole } from "@/types/user";
import { useSetRole } from "@/features/users/hooks/use-set-role";

type RoleSelectProps = {
  user: ApiUser;
  disabled?: boolean; // the admin's own row
};

export function RoleSelect({ user, disabled = false }: RoleSelectProps) {
  const { mutate, isPending, variables } = useSetRole(user.id);

  // While saving, show the chosen role. If the request fails the select falls back to the saved one.
  const value = isPending && variables ? variables : user.role;

  return (
    <NativeSelect
      aria-label={`Role of ${user.name}`}
      className="w-32"
      value={value}
      disabled={disabled || isPending}
      title={disabled ? "You cannot change your own role" : undefined}
      onChange={(event) => mutate(event.target.value as UserRole)}
    >
      {USER_ROLES.map((role) => (
        <option key={role} value={role}>
          {USER_ROLE_LABELS[role]}
        </option>
      ))}
    </NativeSelect>
  );
}