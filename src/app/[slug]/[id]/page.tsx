'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import SkeletonPage from '@/components/Skeleton/SkeletonPage';
import type { ScriptData } from '@/types/common';
import { splitDate } from '@/lib/utils';
import { getScriptDataById } from '@/services/script';
export default function ContentPage({
  params,
}: {
  params: { slug: string; id: number };
}) {
  const [data, setData] = useState<ScriptData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getScriptDataById(params.slug, params.id).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [params]);

  if (loading) {
    return <SkeletonPage />;
  }

  return (
    <>
      <h1>{data?.title}</h1>
      <div className="my-4 flex justify-between">
        <span className="text-sm text-gray-500">
          {splitDate(data?.createDate)}
        </span>
        <span className="text-sm text-gray-500">
          {data?.type.toUpperCase()}
        </span>
      </div>
      <hr />
      <Image
        src={data?.imageUrl || '/images/error.webp'}
        alt={data?.title || ''}
        width={672}
        height={672}
        priority={true}
        className="mt-10 rounded opacity-0 transition-opacity duration-500"
        onLoad={(e) => {
          e.currentTarget.classList.add('opacity-100');
        }}
      />
      <p className="my-10 italic">{data?.description}</p>
      <hr />
      <div
        className="mt-10"
        dangerouslySetInnerHTML={{ __html: data?.content || '' }}
      />
    </>
  );
}
