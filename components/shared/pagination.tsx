import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ApiMeta } from "@/types/api";
import { withSearchParams } from "@/utils/with-search-params";

type PaginationProps = {
    meta: ApiMeta;
    pathname: string;
    searchParams: Record<string, string | undefined>;
};

export function Pagination({ meta, pathname, searchParams }: PaginationProps) {
    const { current_page, last_page, total } = meta;
    if (last_page <= 1) return null;

    const hrefFor = (page: number) =>
        withSearchParams(pathname, searchParams, { page: String(page) });

    return (
        <nav aria-label="Pagination" className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
                Page {current_page} of {last_page} · {total} total
            </p>
            <div className="flex gap-2">
                {current_page > 1 ? (
                    <Button
                        render={<Link href={hrefFor(current_page - 1)} />}
                        nativeButton={false}
                        variant="outline"
                        size="sm"
                    >
                        Previous
                    </Button>
                ) : (
                    <Button variant="outline" size="sm" disabled>
                        Previous
                    </Button>
                )}
                {current_page < last_page ? (
                    <Button
                        render={<Link href={hrefFor(current_page + 1)} />}
                        nativeButton={false}
                        variant="outline"
                        size="sm"
                    >
                        Next
                    </Button>
                ) : (
                    <Button variant="outline" size="sm" disabled>
                        Next
                    </Button>
                )}
            </div>
        </nav>
    );
}