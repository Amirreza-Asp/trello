import { TodoList } from "@/types/todoList";
import TodoCard from "../todo-card";
import TodoListOperations from "./todo-list-operations";

interface Props{
    list : TodoList
}

export default function Todolist({list} : Props) {
  return (
    <section className="list">
          <div className="list-header">
            <span>{list.title}</span>
            {/* <button className="dots">•••</button> */}
           <TodoListOperations id={list.id}/>
          </div>

          { list.todoCards.map(todo=><TodoCard key={todo.id} card={todo}/>) }

          <button className="add-card">+ Add another card</button>
    </section>
  )
}
