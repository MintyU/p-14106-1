"use client";

import { PostDto } from "@/type/post";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Page() {
  const [posts, setPosts] = useState<PostDto[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/posts")
      .then((response) => response.json())
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