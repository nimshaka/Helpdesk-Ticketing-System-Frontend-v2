import { USER_ROLES } from "@/constants/roles";
import type { ApiUser } from "@/types/user";
import { parsePage } from "@/utils/parse-page";
import { USER_ACTIVE_FILTERS } from "./constants";
import type { EditUserValues, UpdateUserChanges, UserFilters } from "./types";

export function parseUserFilters(params: Record<string, string | undefined>): UserFilters {
  return {
    search: params.search?.trim() || undefined,
    role: USER_ROLES.find((role) => role === params.role),
    is_active: USER_ACTIVE_FILTERS.find((value) => value === params.is_active),
    page: parsePage(params.page),
  };
}

/** Only the fields that really changed, so a PATCH never re-sends untouched values. */
export function getUserChanges(user: ApiUser, values: EditUserValues): UpdateUserChanges {
  const name = values.name.trim();
  const email = values.email.trim();
  const changes: UpdateUserChanges = {};

  if (name !== user.name) changes.name = name;
  if (email !== user.email) changes.email = email;

  return changes;
}