import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <LoaderCircle className="size-8 animate-spin text-primary" aria-label="Loading" />
    </main>
  );
}