export type NavIconName = "dashboard" | "tickets" | "users";

export type NavItem = {
  label: string;
  href: string;
  icon: NavIconName; 
};