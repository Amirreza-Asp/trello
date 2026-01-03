'use client';

import { deleteList } from "@/actions/todo-actions";

export default function TodoListOperations({id} : {id : number}) {
    
  const remove = ()=>{
    deleteList(id)
  };

  return (
     <button className="dots" onClick={remove}>Delete List</button>
  )
}
