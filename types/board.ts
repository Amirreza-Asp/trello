import { TodoList } from "./todoList"

export interface Board {
    id : number,
    title : string,
    todoLists : TodoList[]
}