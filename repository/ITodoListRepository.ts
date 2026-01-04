import { TodoList, TodoListDto } from "@/types/todoList";

export interface ITodoListRepository {
    getListByBoardId(boardId: number): TodoListDto[],

    remove(id: number): void,
    add(todoList: TodoList): void,
    updateRange(todoLists: TodoList[]): void,
}

