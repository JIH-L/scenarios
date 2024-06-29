import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonHomeList() {
  return (
    <section className="py-10">
      <Skeleton className="h-[44px] w-60 rounded-xl my-4" />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array(6)
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
