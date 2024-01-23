import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PropsType {
  data: {
    title: string;
    content: string;
    imageUrl: string;
  };
}

export default function ArticleCard(props: PropsType) {
  const { title, content, imageUrl } = props.data;
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
        className="rounded"
        onError={handleError}
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{content}</CardDescription>
      </CardHeader>
    </Card>
  );
}
