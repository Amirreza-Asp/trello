import BoardHeader from "@/components/board/board-header";
import TodoListsContainer from "@/components/todos/todoLists/todo-lists-container";
import { IBoardRepository } from "@/repository/IBoardRepository";
import { createRequestContainer } from "@/repository/requestContainer";


export default function Home() {  
  const requestContainer = createRequestContainer()
  const boardRepository = requestContainer.resolve<IBoardRepository>('IBoardRepository');
  const board = boardRepository.getBoard();

  return (
    <>
      <BoardHeader title={board.title}/>

      <TodoListsContainer todoLists={board.todoLists}/>
    </>
  )
}
