"use client";

import { deleteList, removeTodoListCards } from "@/actions/todo-actions";
import CloseIcon from "@/public/close.svg";
import ThreeDotIcon from "@/public/three-dot.svg";
import Image from "next/image";
import { useState } from "react";

export default function TodoListOperations({ id }: { id: number }) {
  const [isShowOperations, setShowOperations] = useState(false);

  const remove = async () => {

    await deleteList(id);
    setShowOperations(false)
  };
  const removeTodoCards = async () => {
    await removeTodoListCards(id)
    setShowOperations(false)


  };

  return (
    <div className="todo-list-operations">
      <button className="dots pointer">
        <Image width={15} height={15} src={ThreeDotIcon} alt="dot" onClick={() => setShowOperations(true)} />
      </button>
      {isShowOperations && (
        <div className="operations">
          <div className="flex items-center">
            <h4 style={{ flexGrow: 1 }}>List Actions</h4>
            <button type="button" style={{ width: "12px", height: "12px" }} onClick={() => setShowOperations(false)}>
              <Image src={CloseIcon} width={12} height={12} alt="X" />
            </button>
          </div>

          <hr />
          <ul>
            <li onClick={remove}>Delete List</li>
            <li onClick={removeTodoCards}>Delete List Items</li>
          </ul>
        </div>
      )}
    </div>
  );
}
