import { TodoList } from "@/types/todoList";

export  interface ITodoListRepository{
    getListByBoardId(boardId : number) : TodoList[],

    remove(id : number) : void,
    add(todoList: TodoList) : void,
    updateRange(todoLists: TodoList[]): void,
}

