import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { cn } from "@/utils/cn";

type StatCardProps = {
  label: string;
  value: number;
  href?: string;
  className?: string;
};

export function StatCard({ label, value, href, className }: StatCardProps) {
  const card = (
    <Card className={cn("h-full transition-shadow", href && "hover:shadow-md", className)}>
      <CardHeader>
        <CardDescription className="font-medium text-current">{label}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tabular-nums">{value}</p>
      </CardContent>
    </Card>
  );

  if (!href) return card;

  return (
    <Link href={href} className="block rounded-xl">
      {card}
    </Link>
  );
}