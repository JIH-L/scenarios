import HomeList from '@/components/HomeList';
import { Suspense } from 'react';
import SkeletonHomeList from '@/components/Skeleton/SkeletonHomeList';

export default async function Home() {
  return (
    <>
      <section className="flex flex-col items-center gap-2 space-x-2 py-20">
        <h1 className="text-center text-2xl leading-[1.1] md:text-5xl">
          取得靈感，創作劇本
        </h1>
        <span className="max-w-xl text-center text-xs text-gray-500 md:text-base">
          如果你是編劇、作家、遊戲設計師，這裡是你的創作天地，
          <br />
          透過劇本創作，讓你的想法實現。
        </span>
      </section>
      <Suspense fallback={<SkeletonHomeList />}>
        <HomeList type={'games'} priority={true} />
      </Suspense>
      <Suspense fallback={<SkeletonHomeList />}>
        <HomeList type={'novels'} />
      </Suspense>
    </>
  );
}
