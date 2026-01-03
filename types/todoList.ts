import { TodoCard } from "./todoCard";

export interface TodoList{
    id : number,
    title : string,
    todoCards : TodoCard[]
}


export interface CreateTodoList{
    title : string
}