type Params = Record<string, string | undefined>;

/** Builds "/path?a=1&b=2", keeping existing params and applying overrides. Empty values are dropped. */
export function withSearchParams(pathname: string, params: Params, overrides: Params = {}): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries({ ...params, ...overrides })) {
    if (value) query.set(key, value);
  }
  const queryString = query.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
}