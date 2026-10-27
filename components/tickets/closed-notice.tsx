import { Lock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ClosedNotice() {
  return (
    <Alert>
      <Lock />
      <AlertTitle>This ticket is closed</AlertTitle>
      <AlertDescription>It has been resolved, so replies are turned off.</AlertDescription>
    </Alert>
  );
}