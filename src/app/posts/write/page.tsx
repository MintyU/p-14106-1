"use client";

import { apiFetch } from "@/lib/backend/client";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const router = useRouter();

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

    apiFetch(`/api/v1/posts`, {
      method: "POST",
      body: JSON.stringify({
        title: titleInput.value,
        content: contentInput.value,
      }),
    })
      .then((data) => {
        alert(data.msg);
        router.replace(`/posts/${data.data.id}`);
      })
  };


  return (
    <>
      <h1>글쓰기</h1>

      <form className="flex flex-col gap-2 p-2 border border-gray-300 rounded" onSubmit={handleSubmit}>
        <input
          className="border border-gray-300 rounded p-2"
          type="text"
          name="title"
          placeholder="제목"
          autoFocus
          maxLength={100}
        />
        <textarea
          className="border border-gray-300 rounded p-2"
          name="content"
          placeholder="내용"
          cols={80}
          rows={10}
          maxLength={100}
        />
        <button className="bg-black text-white p-2 rounded" type="submit">저장</button>
      </form>
    </>
  );
} 