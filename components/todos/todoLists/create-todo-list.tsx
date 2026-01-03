"use client";

import { createList } from "@/actions/todo-actions";
import { useState } from "react";

export default function CreateTodoList() {
  const [isAddAnotherList, setIsAddAnotherList] = useState<boolean>(false);
  const [title , setTitle] = useState<string>('')
  
  const addTodo = ()=>{
    createList(title);
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
          <input onChange={(e)=>setTitle(e.target.value)} placeholder="Enter a list title..." />
          <div>
            <button onClick={addTodo}>Add list</button>
            <button onClick={() => setIsAddAnotherList(false)}>X</button>
          </div>
        </div>
      )}
    </>
  );
}
