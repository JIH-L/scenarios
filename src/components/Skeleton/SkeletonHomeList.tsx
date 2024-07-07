import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonHomeList() {
  return (
    <section className="pb-10">
      <Skeleton className="my-4 h-7 w-40 rounded-xl md:h-[44px] md:w-60" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-8">
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <SkeletonCard key={index} />
          ))}
      </div>
    </section>
  );
}

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[230px] w-full rounded-xl" />
      <div className="space-y-1.5 p-6">
        <Skeleton className="h-6 w-[150px]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};
