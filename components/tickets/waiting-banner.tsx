import { Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function WaitingBanner() {
  return (
    <Alert className="mb-6 border-amber-300 bg-amber-50 text-amber-900">
      <Clock />
      <AlertTitle>We are waiting for your reply</AlertTitle>
      <AlertDescription className="text-amber-900/80">
        Our team needs more information from you. Reply below to continue.
      </AlertDescription>
    </Alert>
  );
}