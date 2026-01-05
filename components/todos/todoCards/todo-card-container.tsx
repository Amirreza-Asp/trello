'use client'
import { TodoCardDto } from "@/types/todoCard";
import TodoCardItem from "./todo-card-item";

interface Props {
  todoCards: TodoCardDto[];
}

export default function TodoCardContainer({ todoCards }: Props) {
  return (
    <>
      {todoCards.map((todo) => (
        <TodoCardItem key={todo.id} card={todo} />
      ))}
    </>
  );
}
