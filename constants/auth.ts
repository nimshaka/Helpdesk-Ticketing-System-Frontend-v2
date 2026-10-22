export const AUTH_COOKIE_NAME = "helpdesk_token";

// Keep this no longer than the Sanctum token lifetime (`expiration` in config/sanctum.php).
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 8;