import type { z } from "zod";
import type { UserRole } from "@/types/user";
import type { USER_ACTIVE_FILTERS } from "./constants";
import type { createUserSchema, editUserSchema } from "./schemas";

export type UserActiveFilter = (typeof USER_ACTIVE_FILTERS)[number];

export type UserFilters = {
  search?: string;
  role?: UserRole;
  is_active?: UserActiveFilter;
  page?: number;
};

export type CreateUserValues = z.infer<typeof createUserSchema>;
export type EditUserValues = z.infer<typeof editUserSchema>;
export type UpdateUserChanges = Partial<EditUserValues>;