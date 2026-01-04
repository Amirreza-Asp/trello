"use client";

import { createList } from "@/actions/todo-actions";
import { TodoList } from "@/types/todoList";
import { Arya } from "next/font/google";
import { useState } from "react";

export default function CreateTodoList() {
  const [isAddAnotherList, setIsAddAnotherList] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('')

  const addTodo = async () => {

    const body: TodoList = {
      sortOrder: Number.MAX_SAFE_INTEGER,
      title: title,
      boardId: 1
    }

    await fetch('/api/todoList/add', {
      method: "Post",
      body: JSON.stringify(body)
    })

    createList(title, 1);
    setIsAddAnotherList(false);
  }

  return (
    <>
      {!isAddAnotherList ? (
        <button className="add-list" onClick={() => setIsAddAnotherList(true)}>
          + Add another list
        </button>
      ) : (
        <div className="list">
          <input className="" onChange={(e) => setTitle(e.target.value)} placeholder="Enter a list title..." />
          <div className="flex-row ">
            <button
              onClick={addTodo}
              className="creat-card  "
            >
              Add list
            </button> <button onClick={() => setIsAddAnotherList(false)}> <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="#888"        // رنگ کم‌رنگ‌تر
                strokeWidth="4"      // تپل‌تر
                strokeLinecap="round"
              />
            </svg></button></div>
        </div>
      )}
    </>
  );
}
