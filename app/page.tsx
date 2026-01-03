import BoardHeader from "@/components/board/board-header";
import TodoListsContainer from "@/components/todos/todoLists/todo-lists-container";
import { Board } from "@/types/board";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/board");

  const board = (await response.json()).data as Board;
  return (
    <>
      <BoardHeader title={board.title} />

      <TodoListsContainer boardId={board.id} />
    </>
  );
}
