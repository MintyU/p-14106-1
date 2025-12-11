"use client";

import { apiFetch } from "@/lib/backend/client";
import { PostCommentDto, PostWithContentDto } from "@/type/post";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<PostWithContentDto | null>(null);
  const [postComments, setPostComments] = useState<PostCommentDto[] | null>(null);

  const deletePost = (id: number) => {
    apiFetch(`/api/v1/posts/${id}`, {
      method: "DELETE",
    })
      .then((data) => {
        alert(data.msg);
        router.replace("/posts");
      });
  };

  const deletePostComment = (id: number, commentId: number) => {
    apiFetch(`/api/v1/posts/${id}/comments/${commentId}`, {
      method: "DELETE",
    })
      .then((data) => {
        alert(data.msg);

        if (postComments != null) {
          setPostComments(postComments.filter((comment) => comment.id != commentId));
        }
      });
  };

  useEffect(() => {
    apiFetch(`/api/v1/posts/${id}`)
      .then(setPost);

    apiFetch(`/api/v1/posts/${id}/comments`)
      .then(setPostComments);
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

      <h2>댓글 목록</h2>

      {postComments == null && <div>댓글 로딩중...</div>}

      {postComments != null && postComments.length == 0 && <div>댓글이 없습니다.</div>}

      {postComments != null && postComments.length > 0 && (
        <ul>
          {postComments.map((comment) => (
            <li key={comment.id}>
              {comment.content}
              <button onClick={() =>
                confirm(`${comment.id}번 댓글을 정말로 삭제하시겠습니까?`) &&
                deletePostComment(post.id, comment.id)
              }>
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}