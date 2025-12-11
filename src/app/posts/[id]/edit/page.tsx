"use client";

import { apiFetch } from "@/lib/backend/client";
import { PostWithContentDto } from "@/type/post";
import { use } from "react";
import { useState, useEffect } from "react";

export default function EditPage({ params }: { params: Promise<{ id: number }> }) {

  const { id } = use(params);

  const [post, setPost] = useState<PostWithContentDto | null>(null);

  useEffect(() => {
    apiFetch(`/api/v1/posts/${id}`)
      .then(setPost);
  }, []);

  if (post == null) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <h1>{id}번 글 수정</h1>

      <form className="flex flex-col gap-2 p-2 border border-gray-300 rounded">
        <input
          type="text"
          name="title"
          placeholder="제목"
          autoFocus
          defaultValue={post.title}
        />

        <textarea
          className="border border-gray-300 rounded p-2"
          name="content"
          placeholder="내용"
          defaultValue={post.content}
        />
        <button className="bg-black text-white p-2 rounded" type="submit">저장</button>
      </form>
    </>
  );
}