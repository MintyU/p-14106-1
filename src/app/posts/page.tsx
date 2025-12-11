"use client";

import { apiFetch } from "@/lib/backend/client";
import { PostDto } from "@/type/post";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Page() {
  const [posts, setPosts] = useState<PostDto[] | null>(null);

  useEffect(() => {
    apiFetch(`/api/v1/posts`)
      .then(setPosts);
  }, []);

  if (posts == null) {
    return <div>로딩중...</div>;
  }


  return (
    <>
      <h1>글 목록</h1>

      {posts.length === 0 && <div>글이 없습니다.</div>}

      {posts.length > 0 && (
        <ul className="flex flex-col gap-2">
          {posts.map((post) => (
            <li key={post.id} className="p-2 border border-gray-300 rounded hover:bg-gray-100">
              <Link href={`/posts/${post.id}`} className="hover:underline">{post.title}</Link>
            </li>
          ))}
        </ul>
      )}

      <div>
        <Link href="/posts/write">글쓰기</Link>
      </div>
    </>
  );
}