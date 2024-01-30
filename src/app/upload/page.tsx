"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// TipTap
import "@/components/Tiptap/styles.css";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "@/components/Tiptap/MenuBar";

export default function UploadForm() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    if (editor) {
      formData.set("content", editor.getHTML());
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/games`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("上傳成功");
    } else {
      console.error("上傳失敗");
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: "",
  });

  return (
    <>
      <h1 className="text-center my-3">Upload</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto grid gap-5">
        <Input
          type="text"
          name="title"
          required
          placeholder="標題"
          className="flex"
        />
        <Select name="type">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="類型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="movie">Movie</SelectItem>
            <SelectItem value="game">Game</SelectItem>
            <SelectItem value="novel">Novel</SelectItem>
          </SelectContent>
        </Select>
        <Textarea name="description" required placeholder="描述" />
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
        <Input type="file" name="image" required />
        <Button type="submit">上傳</Button>
      </form>
    </>
  );
}
