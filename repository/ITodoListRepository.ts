import { TodoList, TodoListDto, UpdateTodoListTitleDto } from "@/types/todoList";

export interface ITodoListRepository {
    getListByBoardId(boardId: number): TodoListDto[],

    remove(id: number): void,
    add(todoList: TodoList): number,
    updateRange(todoLists: TodoList[]): void,
    updateTitle(todoList: UpdateTodoListTitleDto): void

}

