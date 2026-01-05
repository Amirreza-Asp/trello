"use client";
import BoardHeader from "@/components/board/board-header";
import TodoListsContainer from "@/components/todos/todoLists/todo-lists-container";
import { Board } from "@/types/board";
import { useEffect, useState } from "react";

export default function Home() {
  const [board, setBoard] = useState<Board | undefined>();
  useEffect(() => {
    getBoard();
  }, []);

  const getBoard = async () => {
    const response = await fetch("/api/board");
    const board = (await response.json()).data as Board;
    setBoard(board);
  };

  if(!board)
    return <div>Loading...</div>

  return (
    <>
      <BoardHeader title={board.title} />

      <TodoListsContainer boardId={board.id} />
    </>
  );
}
