'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ScriptData } from '@/types/common';
import { getScriptList } from '@/services/script';
import { splitDate } from '@/lib/utils';
import SkeletonList from '@/components/Skeleton/SkeletonList';

export default function ListPage({ params }: { params: { slug: string } }) {
  const [list, setList] = useState<ScriptData[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  async function fetchList(type: string, page: number) {
    const res = await getScriptList(type, page);
    if (!res) return;
    setList((prevList) => {
      const newList = res.data.filter(
        (item: ScriptData) =>
          !prevList.some((prevItem) => prevItem._id === item._id)
      );
      return [...prevList, ...newList];
    });
    setTotalPages(res.totalPages); // 假設 API 返回 totalPages
    setLoading(false);
  }

  const type: { [key: string]: { url: string; title: string } } = {
    games: {
      url: 'game',
      title: '遊戲劇本',
    },
    novels: {
      url: 'novel',
      title: '小說劇本',
    },
  };

  useEffect(() => {
    fetchList(params.slug, page);
  }, [params.slug, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading ||
        page >= totalPages // 檢查是否已達到 totalPages
      ) {
        return;
      }
      setPage((prevPage) => prevPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, page, totalPages]);

  return (
    <>
      <h1 className="mb-4 text-2xl md:pt-10 md:text-3xl">
        {type[params.slug].title}
      </h1>
      <hr />
      {loading ? (
        <SkeletonList />
      ) : (
        <ul className="mt-4 grid gap-3 p-0 md:mt-8">
          {list.map((item) => (
            <Link key={item._id} href={`/${type[params.slug].url}/${item._id}`}>
              <li className="flex gap-4 rounded-md p-2 transition-all duration-200 hover:bg-slate-100">
                <div className="basis-1/5">
                  <Image
                    src={item?.imageUrl || '/images/error.webp'}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="rounded-md opacity-0 transition-opacity duration-500"
                    onLoad={(e) => {
                      e.currentTarget.classList.add('opacity-100');
                    }}
                  />
                </div>
                <div className="basis-4/5">
                  <h3 className="mb-0 mt-0 text-lg md:mb-2 md:text-xl">
                    {item.title}
                  </h3>
                  <time className="text-xs text-gray-500">
                    {splitDate(item.createdAt)}
                  </time>
                  <p className="m-0 line-clamp-3 text-xs text-[#5C5C5C] md:text-sm xl:line-clamp-none">
                    {item.description}
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
}
