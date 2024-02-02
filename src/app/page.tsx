"use client";
import ArticleCard from "@/components/ArticleCard";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Game {
  _id: string;
  title: string;
  content: string;
  description: string;
  imageUrl: string;
}

export default function Home() {
  const [gamesList, setGamesList] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchGamesList() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/games`);
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }
      const games = await response.json();
      setGamesList(games.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching games:", error);
      return [];
    }
  }

  useEffect(() => {
    fetchGamesList();
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
      <section className="py-10">
        <h2>Games</h2>
        {loading && (
          <div className="grid grid-cols-3 gap-8">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <SkeletonCard key={index} />
              ))}
          </div>
        )}
        <div
          className={`grid grid-cols-3 gap-8 transition-opacity duration-500 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          {gamesList.map((game, index) => (
            <Link href={`/games/${game._id}`} key={game._id}>
              <ArticleCard data={game} priority={index < 3} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
