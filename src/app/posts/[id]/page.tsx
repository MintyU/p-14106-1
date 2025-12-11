"use client";

import { apiFetch } from "@/lib/backend/client";
import { PostWithContentDto } from "@/type/post";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<PostWithContentDto | null>(null);

  const deletePost = (id: number) => {
    apiFetch(`/api/v1/posts/${id}`, {
      method: "DELETE",
    })
      .then((data) => {
        alert(data.msg);
        router.replace("/posts");
      });
  };

  useEffect(() => {
    apiFetch(`/api/v1/posts/${id}`)
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

      <div className="flex gap-2">
        <button className="bg-white text-red-500 border border-red-500 p-2 rounded" onClick={() => confirm(`${post.id}번 글을 정말로 삭제하시겠습니까?`) && deletePost(post.id)}>
          삭제
        </button>
        <Link href={`/posts/${post.id}/edit`} className="bg-white text-blue-500 border border-blue-500 p-2 rounded">
          수정
        </Link>
      </div>
    </>
  );
}