import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import type { ScriptData } from "@/types/common";

export default function HomeList({ scriptList }: { scriptList: ScriptData[] }) {
  return (
    <section className="pb-10">
      <h2 className="text-xl md:text-3xl">最新遊戲劇本</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-8 transition-opacity duration-500 mt-4">
        {scriptList.map((data, index) => (
          <Link
            href={`/game/${data._id}`}
            key={data._id}
            className="hover:scale-105 transition-all duration-300"
          >
            <ArticleCard data={data} priority={index < 4} />
          </Link>
        ))}
      </div>
    </section>
  );
}
