"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import SkeletonPage from "@/components/Skeleton/SkeletonPage";
import type { ScriptData } from "@/types/common";
import { splitDate } from "@/lib/utils";
import { getScriptDataById } from "@/services/script";
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
      <div className="flex justify-between my-4">
        <span className="text-gray-500 text-sm">
          {splitDate(data?.createDate)}
        </span>
        <span className="text-gray-500 text-sm">
          {data?.type.toUpperCase()}
        </span>
      </div>
      <hr />
      <Image
        src={data?.imageUrl || "/images/error.webp"}
        alt={data?.title || ""}
        width={672}
        height={672}
        priority={true}
        className="rounded mt-10 transition-opacity duration-500 opacity-0"
        onLoad={(e) => {
          e.currentTarget.classList.add("opacity-100");
        }}
      />
      <p className="my-10 italic">{data?.description}</p>
      <hr />
      <div
        className="mt-10"
        dangerouslySetInnerHTML={{ __html: data?.content || "" }}
      />
    </>
  );
}
