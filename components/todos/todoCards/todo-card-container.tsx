import { TodoCard } from "@/types/todoCard";
import { useEffect, useState } from "react";
import TodoCardItem from "./todo-card-item";

interface Props {
  todoListId: number;
}

export default function TodoCardContainer({ todoListId }: Props) {
  const [todoCards, setTodoCards] = useState<TodoCard[]>([]);

  useEffect(() => {
    getTodoCards();
  }, [todoListId]);

  const getTodoCards = async () => {
    const response = await fetch(
      `/api/todoCard/getByTodoListId?todoListId=${todoListId}`
    );
    const todoCards = (await response.json()).data as TodoCard[];
    setTodoCards(todoCards);
  };

  return (
    <>
      {todoCards.map((todo) => (
        <TodoCardItem key={todo.id} card={todo} />
      ))}
    </>
  );
}
