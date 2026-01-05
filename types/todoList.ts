import { TodoCardDto } from "./todoCard";

export interface TodoList {
    id?: number,
    title: string,
    boardId: number,
    sortOrder: number
}

export class TodoList implements TodoList {
    constructor(model: CreateTodoList) {
        this.title = model.title;
        this.boardId = model.boardId;
        this.sortOrder = Number.MAX_SAFE_INTEGER;
    }
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
    title: string,
    boardId: number
}
export interface UpdateTodoListTitleDto {
    id: number,
    title: string,
}