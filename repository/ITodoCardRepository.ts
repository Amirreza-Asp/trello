import { TodoCard } from "@/types/todoCard";

export  interface ITodoCardRepository{
    getByTodoListId(todoListId : number) : TodoCard[];
    removeRangeByTodoListId(todoListId : number) : void,
}

