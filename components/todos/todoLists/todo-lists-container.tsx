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

import { TodoCard, TodoCardDto } from "@/types/todoCard";
import { TodoList, TodoListDto, UpdateTodoListTitleDto } from "@/types/todoList";
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
  const [todoLists, setTodoLists] = useState<TodoListDto[]>([]);

  useEffect(() => {
    getTodoLists();
  }, [boardId]);

  const getTodoLists = async () => {
    const response = await fetch(
      `/api/todoList/getListByBoardId?boardId=${boardId}`
    );
    const todoLists = (await response.json()).data as TodoListDto[];
    setTodoLists(todoLists);
  };

  const addTodoList = (model: TodoList) => {
    setTodoLists(oldTodoLists => [...oldTodoLists, new TodoListDto(model)])
  }

  const removeList = (id: number) => {
    setTodoLists((oldTodoLists) => {
      return [...oldTodoLists.filter((todoList) => todoList.id !== id)];
    });
  };

  const removeTodoCards = (todoListId: number) => {
    setTodoLists(oldTodoLists => {
      let newTodoLists = [...oldTodoLists];

      if (newTodoLists.find(todoList => todoList.id == todoListId))
        newTodoLists.find(todoList => todoList.id == todoListId)!.todoCards = [];

      return newTodoLists;
    })
  }

  const addTodoCard = (todoCard: TodoCard) => {
    setTodoLists(oldTodoLists => {
      const newTodoLists = [...oldTodoLists];

      const todoList = newTodoLists.find(todoList => todoList.id == todoCard.todoListId);

      if (!todoList?.todoCards.find(todo => todo.id == todoCard.id))
        todoList!.todoCards = [...todoList!.todoCards, new TodoCardDto(todoCard)];

      return newTodoLists;
    });
  }

  const updateTitle = (model: UpdateTodoListTitleDto): void => {
    setTodoLists(oldTodoLists => {
      let newTodoLists = [...oldTodoLists];
      newTodoLists.find(todoList => todoList.id == model.id)!.title = model.title
      return newTodoLists
    })
  }



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
        <main className="board" >
          {todoLists.map((list) => (
            <SortableTodoList updateTitle={updateTitle} removeTodoCards={removeTodoCards} addTodoCard={addTodoCard} removeList={removeList} key={list.id} list={list} />
          ))}
          <CreateTodoList addTodoList={addTodoList} />
        </main>
      </SortableContext>
    </DndContext>
  );
}
