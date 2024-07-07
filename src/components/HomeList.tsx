import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import type { ScriptData } from '@/types/common';
import { getScriptList } from '@/app/lib/data';

export default async function HomeList({
  type,
  priority,
}: {
  type: string;
  priority?: boolean;
}) {
  const scriptType: { [key: string]: string } = {
    games: '遊戲劇本',
    movies: 'Movies',
    novels: '小說劇本',
  };

  const scriptList = await getScriptList(type);

  return (
    <section className="pb-10">
      <h2 className="text-xl md:text-3xl">最新{scriptType[type]}</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 transition-opacity duration-500 md:grid-cols-3 xl:grid-cols-4 xl:gap-8">
        {scriptList?.slice(0, 8).map((data: ScriptData, index: number) => (
          <Link
            href={`/${type}/${data._id}`}
            key={data._id}
            className="transition-all duration-300 hover:scale-105"
          >
            <ArticleCard data={data} priority={priority && index < 4} />
          </Link>
        ))}
      </div>
    </section>
  );
}
