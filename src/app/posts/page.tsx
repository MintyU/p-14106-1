"use client";

import { PostDto } from "@/type/post";
import Link from "next/link";
import { useState, useEffect } from "react";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Page() {
  const [posts, setPosts] = useState<PostDto[]>([]);

  useEffect(() => {
    fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/v1/posts`)
      .then((response) => response.json() as Promise<PostDto[]>)
      .then(setPosts);
  }, []);


  return (
    <>
      <h1>글 목록</h1>

      {posts.length === 0 && <div>로딩중...</div>}

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}