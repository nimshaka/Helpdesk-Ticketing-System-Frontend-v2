type RawSearchParams = Record<string, string | string[] | undefined>;

/** Next.js gives arrays for repeated params. We only ever use the first value. */
export function normalizeSearchParams(raw: RawSearchParams): Record<string, string | undefined> {
  return Object.fromEntries(
    Object.entries(raw).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]),
  );
}