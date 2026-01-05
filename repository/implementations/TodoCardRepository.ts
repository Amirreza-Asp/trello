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

    add(todoCard: TodoCard): number {
        const result = db.prepare(`
            INSERT INTO TodoCard (title, todoListId)
            VALUES (?, ?)
           `).run(todoCard.title, todoCard.todoListId);

        return result.lastInsertRowid as number;
    }

    remove(todoListId: number): void {
        db.prepare(`
            DELETE FROM TodoCard WHERE todoListId = ?
        `).run(todoListId);
    }
}