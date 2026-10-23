import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-5 w-72" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}