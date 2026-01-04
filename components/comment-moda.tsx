"use client";
import { useState } from "react";


type Comment = {
  id: number;
  text: string;
  time: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};

export default function CommentsModal({
  isOpen,
  onClose,
  title = 'Comments for "Set up Next.js project"',
}: Props) {
  const [comments, setComments] = useState<Comment[]>([

  ]);

  const [value, setValue] = useState("");

  if (!isOpen) return null;

  const addComment = () => {
    if (!value.trim()) return;

    setComments((prev) => [
      ...prev,
      { id: Date.now(), text: value, time: new Date().toLocaleString() },
    ]);
    setValue("");
  };

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
          {comments.length == 0 && <div className="cm-item">

            <div className="cm-item__text">No comments yet. Be the first to comment!</div>
          </div>
          }
          {comments.map((c) => (
            <div key={c.id} className="cm-item">
              <div className="cm-item__meta">
                <span className="cm-item__author">You</span> · {c.time}
              </div>
              <div className="cm-item__text">{c.text}</div>
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
          <button className="cm-actions__submit" onClick={addComment}>
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
}
