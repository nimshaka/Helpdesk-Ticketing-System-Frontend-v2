export const USERS_PATH = "/admin/users";
export const USERS_PER_PAGE = 10;

export const USER_ACTIVE_FILTERS = ["1", "0"] as const;
export const USER_ACTIVE_FILTER_LABELS: Record<(typeof USER_ACTIVE_FILTERS)[number], string> = {
  "1": "Active",
  "0": "Inactive",
};

export const userQueryKey = (id: number) => ["user", id] as const;