"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import SkeletonPage from "@/components/Skeleton/SkeletonPage";

async function fetchDataById(id: string) {
  try {
    const response = await fetch(`/api/novel?id=${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
function splitDate(date: string | undefined) {
  return date ? date.split("T")[0] : "";
}
interface Game {
  _id: string;
  title: string;
  content: string;
  description: string;
  type: string;
  imageUrl: string;
  createDate: string;
}
export default function NovelPage({ params }: { params: { slug: string } }) {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchDataById(params.slug).then((data) => {
      setGame(data);
      setLoading(false);
    });
  }, []); // eslint-disable-line

  if (loading) {
    return <SkeletonPage />;
  }

  return (
    <>
      <h1>{game?.title}</h1>
      <div className="flex justify-between my-4">
        <span className="text-gray-500 text-sm">
          {splitDate(game?.createDate)}
        </span>
        <span className="text-gray-500 text-sm">
          {game?.type.toUpperCase()}
        </span>
      </div>
      <hr />
      <Image
        src={game?.imageUrl || "/images/error.webp"}
        alt={game?.title || ""}
        width={672}
        height={672}
        priority={true}
        className="rounded mt-10 transition-opacity duration-500 opacity-0"
        onLoad={(e) => {
          e.currentTarget.classList.add("opacity-100");
        }}
      />
      <p className="my-10 italic">{game?.description}</p>
      <hr />
      <div
        className="mt-10"
        dangerouslySetInnerHTML={{ __html: game?.content || "" }}
      />
    </>
  );
}
