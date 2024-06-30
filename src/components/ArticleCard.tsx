'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface PropsType {
  data: {
    title: string;
    description: string;
    imageUrl: string;
  };
  priority?: boolean;
}

export default function ArticleCard(props: PropsType) {
  const { title, description, imageUrl } = props.data;
  const { priority } = props;
  const [src, setSrc] = useState(imageUrl);

  const handleError = () => {
    setSrc('/images/error.png');
  };

  return (
    <Card>
      <Image
        src={src}
        alt={title}
        width={300}
        height={300}
        className="rounded-tl-md rounded-tr-md opacity-0 transition-opacity duration-500"
        onError={handleError}
        priority={priority}
        onLoad={(e) => {
          e.currentTarget.classList.add('opacity-100');
        }}
      />
      <CardHeader className="p-4">
        <CardTitle className="my-0 line-clamp-1 text-base md:text-xl">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-xs md:text-sm">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
