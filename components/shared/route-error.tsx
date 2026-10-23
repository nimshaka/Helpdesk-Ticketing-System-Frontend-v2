"use client";

import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { Button } from "@/components/ui/button";

export function RouteError({ reset }: { reset: () => void }) {
  const router = useRouter();

  // router.refresh() re-fetches the server data, reset() re-renders the segment.
  const retry = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <section
      role="alert"
      className="flex flex-col items-center gap-3 rounded-md border border-dashed py-16 text-center"
    >
      <TriangleAlert className="size-10 text-destructive" />
      <h2 className="text-lg font-medium">Something went wrong</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        We could not load this page. Please try again.
      </p>
      <Button variant="outline" onClick={retry}>
        Try again
      </Button>
    </section>
  );
}