"use client";

import { TodoList } from "@/types/todoList";
import type { CreateTodoList } from "@/types/todoList";
import { useState } from "react";

interface Props {
  addTodoList: (todoList: TodoList) => void
}

export default function CreateTodoList({ addTodoList }: Props) {
  const [isAddAnotherList, setIsAddAnotherList] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('')

  const addTodo = async () => {

    const body: CreateTodoList = {
      title: title,
      boardId: 1
    }

    const response = await fetch('/api/todoList/add', {
      method: "Post",
      body: JSON.stringify(body)
    })

    const id = (await response.json()).id;

    const todoList = new TodoList(body);
    todoList.id = id;

    setIsAddAnotherList(false);
    addTodoList(todoList);
  }

  return (
    <div style={{ flex: '0 0 auto' }}>
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
                stroke="#888"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg></button></div>
        </div>
      )}
    </div>
  );
}
