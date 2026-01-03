import { TodoList } from "@/types/todoList";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import TodoCard from "../todo-card";
import TodoListOperations from "./todo-list-operations";

interface Props{
    list : TodoList,
     dragListeners?: SyntheticListenerMap
}

export default function Todolist({list , dragListeners} : Props) {
  return (
    <section className="list">
          <div className="list-header">
            <p {...dragListeners} className="w-full pointer" >{list.title}</p>
            {/* <button className="dots">•••</button> */}
           <TodoListOperations id={list.id}/>
          </div>

          { list.todoCards.map(todo=><TodoCard key={todo.id} card={todo}/>) }

          <button className="add-card">+ Add another card</button>
    </section>
  )
}
