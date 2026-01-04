import { TodoCard } from "@/types/todoCard";

export interface ITodoCardRepository {
    getByTodoListId(todoListId: number): TodoCard[];
    remove(id: number): void,
    add(todoCard: TodoCard): number,
}

