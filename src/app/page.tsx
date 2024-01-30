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
      <section>
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
        {gamesList.map((game) => (
          <Link href={`/games/${game._id}`} key={game._id}>
            <ArticleCard data={game} />
          </Link>
        ))}
      </div>
      </section>
    </>
  );
}
