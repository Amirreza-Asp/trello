import { TodoCard } from "@/types/todoCard";
import { TodoListDto, UpdateTodoListTitleDto } from "@/types/todoList";
import { useWindowEvent } from "@/utilities/hooks/useWindowEvent";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { KeyboardEvent, useRef, useState } from "react";
import CreateTodoCard from "../todoCards/create-todo-card";
import TodoCardContainer from "../todoCards/todo-card-container";
import TodoListOperations from "./todo-list-operations";

interface Props {
  list: TodoListDto;
  dragListeners?: SyntheticListenerMap;
  removeList: (id: number) => void;
  addTodoCard: (todoCard: TodoCard) => void;
  removeTodoCards: (todoListId: number) => void;
  updateTitle: (model: UpdateTodoListTitleDto) => void;
}

export default function Todolist({
  list,
  dragListeners,
  removeList,
  addTodoCard,
  removeTodoCards,
  updateTitle: updateTodoListTitle,
}: Props) {
  const [showInputTitle, setShowInputTitle] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useWindowEvent("click", (e) => {
    const isDivClicked =
      divRef.current &&
      e.target instanceof Node &&
      divRef.current.contains(e.target);
    if (!isDivClicked) {
      if (showInputTitle) updateTitle();
      setShowInputTitle(false);
    }
  });

  const titleChanged = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      updateTitle();
    }
  };

  const updateTitle = async () => {
    if (!inputRef.current?.value) {
      alert("title must have a value");
      return;
    }

    const model: UpdateTodoListTitleDto = {
      id: list.id,
      title: inputRef.current?.value!,
    };

    await fetch("/api/todoList/updateTitle", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(model),
    });

    setShowInputTitle(false);
    updateTodoListTitle(model);
  };

  return (
    <section className="list">
      <div className="list-header gap-5 ">
        <div className="w-full" ref={divRef} {...dragListeners}>
          {showInputTitle ? (
            <input
              type="text"
              className="text-xl"
              onKeyUp={titleChanged}
              defaultValue={list.title}
              ref={inputRef}
            />
          ) : (
            <button
              type="button"
              className="w-max-content pointer text-left flex text-xl "
            >
              <span
                onPointerDown={(e) => {
                  e.preventDefault();
                  setShowInputTitle(true);
                }}
              >
                {list.title}
              </span>
            </button>
          )}
        </div>

        <TodoListOperations
          id={list.id!}
          removeList={removeList}
          removeTodoCards={removeTodoCards}
        />
      </div>

      <TodoCardContainer todoCards={list.todoCards} />

      <CreateTodoCard addTodoCard={addTodoCard} todoListId={list.id!} />
    </section>
  );
}
