"use client";

import { PostWithContentDto } from "@/type/post";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<PostWithContentDto | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/posts/${id}`)
      .then((res) => res.json() as Promise<PostWithContentDto>)
      .then(setPost);
  }, []);

  if (post == null) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <h1>글 상세페이지</h1>

      <div>번호 : {post.id}</div>
      <div>제목: {post.title}</div>
      <div style={{ whiteSpace: "pre-line" }}>{post.content}</div>

    </>
  );
}