import { TodoCardDto } from "./todoCard";

export interface TodoList {
    id?: number,
    title: string,
    boardId: number,
    sortOrder: number
}


export interface TodoListDto {
    id: number,
    title: string,
    boardId: number,
    sortOrder: number,
    todoCards: TodoCardDto[]
}

export class TodoListDto implements TodoListDto {
    constructor(todoList: TodoList, todoCards?: TodoCardDto[]) {
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