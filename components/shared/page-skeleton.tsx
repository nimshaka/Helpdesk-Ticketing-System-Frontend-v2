import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton() {
  return (
    <main className="space-y-4 p-8">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-5 w-72" />
      <Skeleton className="h-9 w-24" />
    </main>
  );
}