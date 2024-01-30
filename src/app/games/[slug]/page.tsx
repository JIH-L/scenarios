"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

async function fetchDataById(id: string) {
  try {
    const response = await fetch(`/api/game?id=${id}`);
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
export default function Page({ params }: { params: { slug: string } }) {
  const [game, setGame] = useState<Game | null>(null);
  useEffect(() => {
    fetchDataById(params.slug).then((data) => {
      setGame(data);
    });
  }, []); // eslint-disable-line

  return (
    <>
      <h1>{game?.title}</h1>
      <div className=" flex justify-between my-4">
        <span className="text-gray-500 text-sm">{splitDate(game?.createDate)}</span>
        <span className="text-gray-500 text-sm">
          {game?.type.toUpperCase()}
        </span>
      </div>
      <hr />
      <Image
        src={game?.imageUrl || "/images/error.png"}
        alt={game?.title || ""}
        width={672}
        height={300}
        className="rounded mt-10"
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
