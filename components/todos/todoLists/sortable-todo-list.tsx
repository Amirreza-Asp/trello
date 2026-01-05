'use client'

import { TodoCard } from "@/types/todoCard";
import { TodoListDto, UpdateTodoListTitleDto } from "@/types/todoList";
import { useSortable } from "@dnd-kit/sortable";
import { CSSProperties } from "react";
import Todolist from "./todo-list";

interface Props {
  list: TodoListDto,
  removeList: (id: number) => void,
  removeTodoCards: (todoListId: number) => void;
  addTodoCard: (model: TodoCard) => void,
  updateTitle: (model: UpdateTodoListTitleDto) => void
}

export default function SortableTodoList({ list, removeList, removeTodoCards, addTodoCard, updateTitle }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: list.id.toString() })

  const transformWithoutScale = transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    : undefined

  const style: CSSProperties = {
    transform: transformWithoutScale,
    transition,
    minWidth: 250,
    borderRadius: 5,
    display: "flex",
    flexDirection: "column"
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Todolist updateTitle={updateTitle} addTodoCard={addTodoCard} removeList={removeList} list={list} removeTodoCards={removeTodoCards} dragListeners={listeners} />
    </div>
  )
}
