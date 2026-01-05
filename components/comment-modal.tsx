"use client";
import { Comment, CreateCommentDto } from "@/types/comment";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  todoCardId: number

};

export default function CommentsModal({
  todoCardId,
  isOpen,
  onClose,
  title = 'Comments for "Set up Next.js project"',
}: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    getComments();
  }, [todoCardId])

  const getComments = async () => {
    const response = await fetch(`/api/comment/getByTodoCardId?todoCardId=${todoCardId}`)
    const data = (await response.json()).data;
    setComments(data)
  }
  const addComment = async () => {
    if (!value.trim()) {
      alert("comment must have content");
      return;
    }

    const body: CreateCommentDto = {
      content: value,
      todoCardId
    };

    await fetch("/api/comment/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    setValue("");
    getComments();
  };








  if (!isOpen) return null;

  return (
    <div className="cm-overlay" onClick={onClose}>
      <div className="cm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cm-header">
          <h2 className="cm-header__title">{title}</h2>
          <button className="cm-header__close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="cm-list">
          {comments.length === 0 && (
            <div className="cm-item">
              <div className="cm-item__text">
                No comments yet. Be the first to comment!
              </div>
            </div>
          )}

          {comments.map((c) => (
            <div key={c.id} className="cm-item">
              <div className="cm-item__meta">
                <span className="cm-item__author">
                  {c.isMine ? "You" : c.author}
                </span>
                {" · "}
                {new Date(c.createdAt).toLocaleString("en-US")}
              </div>
              <div className="cm-item__text">{c.content}</div>
            </div>
          ))}
        </div>

        <div className="cm-input">
          <textarea
            className="cm-input__textarea"
            placeholder="Write a comment..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="cm-actions">
          <button type="button" className="cm-actions__submit" onClick={addComment}>
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );

}
