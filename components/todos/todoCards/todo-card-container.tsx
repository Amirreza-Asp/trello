import { TodoCard } from "@/types/todoCard";
import { useEffect, useState } from "react";
import TodoCardItem from "./todo-card-item";

interface Props {
  todoCards: TodoCard[];
}

export default function TodoCardContainer({ todoCards: initialTodoCards }: Props) {
  const [todoCards, setTodoCards] = useState<TodoCard[]>(initialTodoCards)

  useEffect(() => {
    setTodoCards(initialTodoCards);
  }, [initialTodoCards])

  return (
    <>
      {todoCards.map((todo) => (
        <TodoCardItem key={todo.id} card={todo} />
      ))}
    </>
  );
}
