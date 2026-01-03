'use client'

import { TodoList } from "@/types/todoList";
import { useSortable } from "@dnd-kit/sortable";
import { CSSProperties } from "react";
import Todolist from "./todo-list";

interface Props {
  list: TodoList,
  removeList : (id : number)=>void
}

export default function SortableTodoList({ list  , removeList}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: list.id.toString() })

 const transformWithoutScale = transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    : undefined

  const style : CSSProperties = {
    transform: transformWithoutScale ,
    transition,
    minWidth: 250, 
    borderRadius: 5,
    display: "flex",
    flexDirection: "column"
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Todolist removeList={removeList} list={list} dragListeners={listeners}/>
    </div>
  )
}
