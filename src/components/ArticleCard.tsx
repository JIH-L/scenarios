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
    setSrc("/images/error.png");
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
        priority={priority}
      />
      <CardHeader>
        <CardTitle className="my-0">{title}</CardTitle>
        <CardDescription className="line-clamp-3 min-h-[60px]">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
