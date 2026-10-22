import { redirect } from "next/navigation";
import { ROLE_HOME } from "@/features/auth/constants";
import { requireUser } from "@/features/auth/utils";

export const instant = false;

export default async function DashboardRedirectPage() {
  const user = await requireUser();
  redirect(ROLE_HOME[user.role]);
}