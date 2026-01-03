import { db } from "@/data/db";
import type { TodoCard } from "@/types/todoCard";
import { ITodoCardRepository } from "../ITodoCardRepository";

export class TodoCardRepository implements ITodoCardRepository {
    getByTodoListId(todoListId: number): TodoCard[] {
        const todoCards = db
            .prepare("SELECT * FROM TodoCard WHERE todoListId = ? ORDER BY Id")
            .all(todoListId) as TodoCard[];

        return todoCards;
    }

    removeRangeByTodoListId(todoListId: number): void {
        const jsonTodoCards = localStorage.get('todoCards');
        let todoCards = JSON.parse(jsonTodoCards) as TodoCard[];

        todoCards = todoCards.filter(todoCard => todoCard.todoListId != todoListId);

        localStorage.set('todoCards', JSON.stringify(todoCards));
    }
}