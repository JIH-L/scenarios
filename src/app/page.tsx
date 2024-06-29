'use client';
import { useEffect, useState } from 'react';
import HomeList from '@/components/HomeList';
import SkeletonHomeList from '@/components/Skeleton/SkeletonHomeList';
import type { ScriptData } from '@/types/common';
import { fetchScriptList } from '@/services/script';

export default function Home() {
  const [gamesList, setGamesList] = useState<ScriptData[]>([]);
  const [novelsList, setNovelsList] = useState<ScriptData[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [novelsLoading, setNovelsLoading] = useState(true);

  async function fetchGamesList() {
    const res = await fetchScriptList('games');
    setGamesList(res);
    setGamesLoading(false);
  }

  async function fetchNovelsList() {
    const res = await fetchScriptList('novels');
    setNovelsList(res);
    setNovelsLoading(false);
  }

  useEffect(() => {
    fetchGamesList();
    fetchNovelsList();
  }, []);

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
      {gamesLoading ? (
        <SkeletonHomeList />
      ) : (
        <HomeList scriptList={gamesList} type={'game'} />
      )}
      {novelsLoading ? (
        <SkeletonHomeList />
      ) : (
        <HomeList scriptList={novelsList} type={'novel'} />
      )}
    </>
  );
}
