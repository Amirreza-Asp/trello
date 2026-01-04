import { TodoCard } from "@/types/todoCard";
import { TodoListDto } from "@/types/todoList";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import CreateTodoCard from "../todoCards/create-todo-card";
import TodoCardContainer from "../todoCards/todo-card-container";
import TodoListOperations from "./todo-list-operations";

interface Props {
  list: TodoListDto;
  dragListeners?: SyntheticListenerMap;
  removeList: (id: number) => void,
  addTodoCard: (todoCard: TodoCard) => void,
  removeTodoCards: (todoListId: number) => void
}


export default function Todolist({ list, dragListeners, removeList, addTodoCard, removeTodoCards }: Props) {

  return (
    <section className="list">
      <div className="list-header">
        <p {...dragListeners} className="w-full pointer">
          {list.title}
        </p>
        <TodoListOperations id={list.id!} removeList={removeList} removeTodoCards={removeTodoCards} />
      </div>

      <TodoCardContainer todoCards={list.todoCards} />

      <CreateTodoCard addTodoCard={addTodoCard} todoListId={list.id!} />

    </section>
  );
}
