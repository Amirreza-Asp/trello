"use client";

import CloseIcon from "@/public/close.svg";
import ThreeDotIcon from "@/public/three-dot.svg";
import Image from "next/image";
import { useState } from "react";

interface Props {
  id: number;
  removeList: (id: number) => void;
  removeTodoCards: (todoListId: number) => void;
}

export default function TodoListOperations({ id, removeList, removeTodoCards }: Props) {
  const [isShowOperations, setShowOperations] = useState(false);

  const remove = async () => {
    await fetch(`/api/todoList/delete?id=${id}`, {
      method: "DELETE",
    });

    removeList(id);
  };

  const removeTodoCardsList = async () => {
    await fetch(`/api/todoCard/delete?id=${id}`, {
      method: "DELETE",
    });

    removeTodoCards(id);
  };

  return (
    <div className="todo-list-operations">
      <button className="dots pointer">
        <Image
          width={15}
          height={15}
          src={ThreeDotIcon}
          alt="dot"
          onClick={() => setShowOperations(true)}
        />
      </button>
      {isShowOperations && (
        <div className="operations">
          <div className="header" >
            <h4>List Actions</h4>
            <button
              type="button"
              style={{ width: "12px", height: "12px" }}
              onClick={() => setShowOperations(false)}
            >
              <Image src={CloseIcon} width={12} height={12} alt="X" />
            </button>
          </div>

          <hr />
          <ul>
            <li onClick={remove}>Delete List</li>
            <li onClick={removeTodoCardsList}>Delete List Items</li>
          </ul>
        </div>
      )}
    </div>
  );
}
