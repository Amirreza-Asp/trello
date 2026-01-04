import { TodoCard } from "./todoCard"

export interface TodoList {
    id?: number,
    title: string,
    boardId: number,
    sortOrder: number
}


export interface GetTodoListDto {
    id: number,
    title: string,
    boardId: number,
    sortOrder: number,
    todoCards: TodoCard[]
}

export class GetTodoListDto implements GetTodoListDto {
    constructor(todoList: TodoList, todoCards?: TodoCard[]) {
        this.id = todoList.id!;
        this.title = todoList.title;
        this.boardId = todoList.boardId;
        this.sortOrder = todoList.sortOrder;
        this.todoCards = todoCards ?? [];
    }
}


export interface CreateTodoList {
    title: string
}