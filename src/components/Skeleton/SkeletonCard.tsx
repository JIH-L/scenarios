import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[275px] w-full rounded-xl" />
      <div className="space-y-1.5 p-6">
        <Skeleton className="h-6 w-[150px]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
