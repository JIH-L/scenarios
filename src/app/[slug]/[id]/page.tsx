import Image from 'next/image';
import type { ScriptData } from '@/types/common';
import { splitDate } from '@/lib/utils';
import type { Metadata, ResolvingMetadata } from 'next';
import { getScriptById } from '@/app/lib/data';
import { Suspense } from 'react';
import SkeletonPage from '@/components/Skeleton/SkeletonPage';

type Props = {
  params: { slug: string; id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;
  const type = params.slug;

  // fetch data
  const data = (await getScriptById(`${type}s`, id)) as ScriptData;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: data?.title,
    description: data?.description.slice(0, 160) || '',
    openGraph: {
      type: 'website',
      title: data?.title,
      description: data?.description.slice(0, 160),
      url: `${process.env.NEXT_PUBLIC_URL}/${type}/${id}`,
      images: [data?.imageUrl || '/images/error.webp', ...previousImages],
    },
  };
}
export default async function ContentPage({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const data = await getScriptById(`${params.slug}s`, params.id);

  return (
    <Suspense fallback={<SkeletonPage />}>
      <h1>{data?.title}</h1>
      <div className="my-4 flex justify-between">
        <span className="text-sm text-gray-500">
          {splitDate(data?.createdAt)}
        </span>
        <span className="text-sm text-gray-500">
          {data?.type?.toUpperCase()}
        </span>
      </div>
      <hr />
      <Image
        src={data?.imageUrl || '/images/error.webp'}
        alt={data?.title || ''}
        width={672}
        height={672}
        priority={true}
        className="mt-10 rounded"
      />
      <p className="my-10 italic">{data?.description}</p>
      <hr />
      <div
        className="mt-10"
        dangerouslySetInnerHTML={{ __html: data?.content || '' }}
      />
    </Suspense>
  );
}
