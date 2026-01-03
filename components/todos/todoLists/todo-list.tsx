import { TodoList } from "@/types/todoList";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import TodoCardContainer from "../todoCards/todo-card-container";
import TodoListOperations from "./todo-list-operations";

interface Props {
  list: TodoList;
  dragListeners?: SyntheticListenerMap;
  removeList : (id : number)=>void
}

export default function Todolist({ list, dragListeners , removeList }: Props) {

  return (
    <section className="list">
      <div className="list-header">
        <p {...dragListeners} className="w-full pointer">
          {list.title}
        </p>
        {/* <button className="dots">•••</button> */}
        <TodoListOperations id={list.id} removeList={removeList} />
      </div>

       <TodoCardContainer todoListId={list.id} />

      <button className="add-card">+ Add another card</button>
    </section>
  );
}
