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

  return (
    <Card>
      <Image
        src={imageUrl}
        alt="Uploaded"
        width={300}
        height={300}
        className="rounded"
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{content}</CardDescription>
      </CardHeader>
    </Card>
  );
}
