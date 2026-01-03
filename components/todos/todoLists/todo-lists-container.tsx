"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import SortableTodoList from "@/components/todos/todoLists/sortable-todo-list";

import { TodoList } from "@/types/todoList";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import CreateTodoList from "./create-todo-list";

interface Props {
  boardId: number;
}

export default function TodoListsContainer({ boardId }: Props) {
  const sensors = useSensors(useSensor(PointerSensor));
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);

  useEffect(() => {
    getTodoLists();
  }, [boardId]);

  const getTodoLists = async () => {
    const response = await fetch(
      `/api/todoList/getListByBoardId?boardId=${boardId}`
    );
    const todoLists = (await response.json()).data as TodoList[];
    setTodoLists(todoLists);
  };

  const removeList = (id: number) => {
    setTodoLists((oldTodoLists) => {
      return [...oldTodoLists.filter((todoList) => todoList.id !== id)];
    });
  };

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
      newLists.forEach((list, index) => (list.sortOrder = index));
      setTodoLists(newLists);
      await sendUpdateListsRequest(newLists);
    }
  }

  const sendUpdateListsRequest = async (newLists: TodoList[]) => {
    await fetch("/api/todoList/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLists),
    });
  };

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
            <SortableTodoList removeList={removeList} key={list.id} list={list} />
          ))}
          <CreateTodoList />
        </main>
      </SortableContext>
    </DndContext>
  );
}
