'use client'

import {
    closestCenter,
    DndContext,
    DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";

import SortableTodoList from "@/components/todos/todoLists/sortable-todo-list";

import { updateTodoLists } from "@/actions/todo-actions";
import { TodoList } from "@/types/todoList";
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import CreateTodoList from "./create-todo-list";

interface Props {
  todoLists: TodoList[];
}

export default function TodoListsContainer({ todoLists : initialTodoLists }: Props) {
  const sensors = useSensors(useSensor(PointerSensor));  
  const [todoLists , setTodoLists] = useState<TodoList[]>(initialTodoLists)
  
  useEffect(()=>{
    setTodoLists(initialTodoLists);
  } , [initialTodoLists])

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = todoLists.findIndex(
        (list) => list.id.toString() === active.id.toString()
      );
      const newIndex = todoLists.findIndex(
        (list) => list.id.toString() === over?.id.toString()
      );
      const newLists = arrayMove(todoLists, oldIndex, newIndex);
      setTodoLists(newLists);
      await updateTodoLists(newLists);
    }
  }


  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={todoLists.map((l) => l.id.toString())}
        strategy={horizontalListSortingStrategy}
      >
        <main className="board" style={{ display: "flex", gap: "16px" }}>
          {todoLists.map((list) => (
            <SortableTodoList key={list.id} list={list} />
          ))}
          <CreateTodoList />
        </main>
      </SortableContext>
    </DndContext>
  );
}
