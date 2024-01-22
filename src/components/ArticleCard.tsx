import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ArticleCard(props) {
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
