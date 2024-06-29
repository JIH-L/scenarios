import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonList() {
  return (
    <>
      <ul className="mt-4 grid gap-3 p-0 md:mt-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </ul>
    </>
  );
}

const SkeletonCard = () => {
  return (
    <li className="flex gap-4 rounded-md p-2">
      <div className="basis-1/5">
        <Skeleton className="h-1/2 w-full rounded-md sm:h-full xl:h-[200px]" />
      </div>
      <div className="basis-4/5 space-y-1 md:space-y-2 xl:space-y-3">
        <Skeleton className="h-6 w-1/2 md:h-9" />
        <Skeleton className="h-4 w-[70px]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </li>
  );
};
