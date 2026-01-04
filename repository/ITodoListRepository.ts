import { GetTodoListDto, TodoList } from "@/types/todoList";

export interface ITodoListRepository {
    getListByBoardId(boardId: number): GetTodoListDto[],

    remove(id: number): void,
    add(todoList: TodoList): void,
    updateRange(todoLists: TodoList[]): void,
}

