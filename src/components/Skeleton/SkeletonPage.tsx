import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-10 w-[250px]" />
      <Skeleton className="h-5 w-full" />
      <hr className="my-10"/>
      <Skeleton className="h-[672px] w-full rounded-xl" />
      <hr />
      <div className="space-y-1.5">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    </div>
  );
}
