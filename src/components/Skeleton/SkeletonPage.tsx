import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonPage() {
  return (
    <div className="flex flex-col space-y-6">
      <Skeleton className="h-10 w-[250px]" />
      <Skeleton className="h-5 w-full" />
      <hr />
      <Skeleton className="h-[672px] w-full rounded-xl" />
      <hr />
      <div className="space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    </div>
  );
}
