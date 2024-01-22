"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function UploadForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const response = await fetch(`${process.env.VERCEL_URL}/api/games`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("上傳成功");
    } else {
      console.error("上傳失敗");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto grid gap-5">
      <Input
        type="text"
        name="title"
        required
        placeholder="標題"
        className="flex"
      />
      <Textarea name="content" required placeholder="內文" />
      <Input type="file" name="image" required />
      <Button type="submit">上傳</Button>
    </form>
  );
}
