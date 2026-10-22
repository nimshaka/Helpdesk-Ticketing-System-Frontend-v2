import { CircleAlert } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function FormAlert({ error }: { error: unknown }) {
  if (typeof error !== "string" || error === "") return null;

  return (
    <Alert variant="destructive">
      <CircleAlert />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}