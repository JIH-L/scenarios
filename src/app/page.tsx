"use client";
import ArticleCard from "@/components/ArticleCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [gamesList, setGamesList] = useState([]);

  async function fetchGamesList() {
    try {
      const response = await fetch(`${process.env.VERCEL_URL}/api/games`);
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }
      const games = await response.json();
      setGamesList(games.data);
    } catch (error) {
      console.error("Error fetching games:", error);
      return [];
    }
  }

  useEffect(() => {
    fetchGamesList();
  }, []);

  return (
    <div>
      <div className=" w-full h-96 min-h-full bg-slate-400 items-center flex justify-center mb-10">
        <h1 className="text-white text-5xl font-bold">HELLO!</h1>
      </div>
      <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
        {gamesList.map((game) => (
          <ArticleCard key={game._id} data={game} />
        ))}
      </div>
    </div>
  );
}
