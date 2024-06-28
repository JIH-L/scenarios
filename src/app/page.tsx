"use client";
import ArticleCard from "@/components/ArticleCard";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { useEffect, useState } from "react";
import Link from "next/link";

type Script = {
  _id: string;
  title: string;
  content: string;
  description: string;
  imageUrl: string;
};

export default function Home() {
  const [gamesList, setGamesList] = useState<Script[]>([]);
  const [novelsList, setNovelsList] = useState<Script[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [novelsLoading, setNovelsLoading] = useState(true);

  async function fetchGamesList() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/games`);
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }
      const res = await response.json();
      setGamesList(res.data);
      setGamesLoading(false);
    } catch (error) {
      console.error("Error fetching games:", error);
      return [];
    }
  }

  async function fetchNovelsList() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/novels`);
      if (!response.ok) {
        throw new Error("Failed to fetch novels");
      }
      const res = await response.json();
      setNovelsList(res.data);
      setNovelsLoading(false);
    } catch (error) {
      console.error("Error fetching games:", error);
      return [];
    }
  }

  useEffect(() => {
    fetchGamesList();
    fetchNovelsList();
  }, []);

  return (
    <>
      <section className="flex flex-col space-x-2 gap-2 items-center py-20">
        <h1 className="text-6xl text-center leading-[1.1]">
          AI Powered Script Writing
        </h1>
        <span className="text-center max-w-xl text-gray-500">
          Explore ChatScripter, an innovative platform where AI technology meets
          creative scriptwriting. Generate unique scripts effortlessly with AI.
        </span>
      </section>
      {gamesLoading ? (
        <SkeletonCard />
      ) : (
        <section className="py-10">
          <h2>最新遊戲劇本</h2>
          <div
            className={`grid grid-cols-3 gap-8 transition-opacity duration-500 mt-4 ${
              gamesLoading ? "opacity-0" : "opacity-100"
            }`}
          >
            {gamesList.map((data, index) => (
              <Link
                href={`/games/${data._id}`}
                key={data._id}
                className="hover:scale-105 transition-all duration-300"
              >
                <ArticleCard data={data} priority={index < 3} />
              </Link>
            ))}
          </div>
        </section>
      )}
      {novelsLoading ? (
        <SkeletonCard />
      ) : (
        <section className="py-10">
          <h2>最新小說劇本</h2>
          <div
            className={`grid grid-cols-3 gap-8 transition-opacity duration-500 mt-4 ${
              novelsLoading ? "opacity-0" : "opacity-100"
            }`}
          >
            {novelsList.map((data, index) => (
              <Link
                href={`/novels/${data._id}`}
                key={data._id}
                className="hover:scale-105 transition-all duration-300"
              >
                <ArticleCard data={data} priority={index < 3} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
