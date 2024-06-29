import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import type { ScriptData } from '@/types/common';

export default function HomeList({
  scriptList,
  type,
}: {
  scriptList: ScriptData[];
  type: string;
}) {
  const scriptType: { [key: string]: string } = {
    game: '遊戲劇本',
    movies: 'Movies',
    novel: '小說劇本',
  };
  return (
    <section className="pb-10">
      <h2 className="text-xl md:text-3xl">最新{scriptType[type]}</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 transition-opacity duration-500 md:grid-cols-3 xl:grid-cols-4 xl:gap-8">
        {scriptList.map((data, index) => (
          <Link
            href={`/${type}/${data._id}`}
            key={data._id}
            className="transition-all duration-300 hover:scale-105"
          >
            <ArticleCard data={data} priority={index < 4} />
          </Link>
        ))}
      </div>
    </section>
  );
}
