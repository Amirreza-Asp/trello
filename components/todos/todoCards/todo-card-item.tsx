"use client";

import { useState } from "react";

import type { TodoCard } from "@/types/todoCard";
import CommentsModal from "@/components/comment-moda";



interface Props {
  card: TodoCard;
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
          Comments ({0})
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
