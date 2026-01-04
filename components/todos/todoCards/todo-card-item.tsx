"use client";

import { useState } from "react";

import CommentsModal from "@/components/comment-moda";
import type { TodoCardDto } from "@/types/todoCard";

interface Props {
  card: TodoCardDto;
}

export default function TodoCardItem({ card: todo }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="card">
        <p>{todo.title}</p>

        <button
          className="comment"
          onClick={() => setOpen(true)}
        >
          Comments ({todo.commentsCount})
        </button>
      </div>

      <CommentsModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={`Comments for "${todo.title}"`}
      />
    </>
  );
}
