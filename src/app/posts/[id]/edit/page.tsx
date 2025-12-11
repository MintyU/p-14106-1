"use client";

import { apiFetch } from "@/lib/backend/client";
import { PostWithContentDto } from "@/type/post";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useState, useEffect } from "react";

export default function EditPage({ params }: { params: Promise<{ id: number }> }) {
  const router = useRouter();

  const { id } = use(params);

  const [post, setPost] = useState<PostWithContentDto | null>(null);

  useEffect(() => {
    apiFetch(`/api/v1/posts/${id}`)
      .then(setPost);
  }, []);

  if (post == null) {
    return <div>로딩중...</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const contentInput = form.elements.namedItem("content") as HTMLTextAreaElement;

    titleInput.value = titleInput.value.trim();

    if (titleInput.value.length === 0) {
      alert("제목을 입력해주세요.");
      titleInput.focus();
      return;
    }

    if (titleInput.value.length < 2) {
      alert("제목을 2자 이상 입력해주세요.");
      titleInput.focus();
      return;
    }

    contentInput.value = contentInput.value.trim();

    if (contentInput.value.length === 0) {
      alert("내용을 입력해주세요.");
      contentInput.focus();
      return;
    }

    if (contentInput.value.length < 2) {
      alert("내용을 2자 이상 입력해주세요.");
      contentInput.focus();
      return;
    }

    apiFetch(`/api/v1/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: titleInput.value,
        content: contentInput.value,
      }),
    })
      .then((data) => {
        alert(data.msg);
        router.replace(`/posts/${id}`);
      })
  };

  return (
    <>
      <h1>{id}번 글 수정</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-2 border border-gray-300 rounded">
        <input
          type="text"
          name="title"
          placeholder="제목"
          autoFocus
          defaultValue={post.title}
          maxLength={100}
        />

        <textarea
          className="border border-gray-300 rounded p-2"
          name="content"
          placeholder="내용"
          defaultValue={post.content}
          rows={10}
          maxLength={100}
        />
        <button className="bg-black text-white p-2 rounded" type="submit">저장</button>
      </form>
    </>
  );
}