import { db } from "@/data/db";
import { GetTodoListDto, TodoList } from "@/types/todoList";
import { ITodoListRepository } from "../ITodoListRepository";
import { TodoCard } from "@/types/todoCard";

export class TodoListRepository implements ITodoListRepository {
    getListByBoardId(boardId: number): GetTodoListDto[] {
        let todoListItems: GetTodoListDto[] = [];

        const todoLists = db
            .prepare("SELECT * FROM TodoList WHERE boardId = ? ORDER BY SortOrder")
            .all(boardId) as TodoList[];


        todoLists.forEach(todoList => {
            const todoCards = db
                .prepare("SELECT * FROM TodoCard WHERE todoListId = ? ORDER BY Id")
                .all(todoList.id!) as TodoCard[];

            todoListItems.push(new GetTodoListDto(todoList, todoCards));
        })

        return todoListItems;
    }

    add(todoList: TodoList): void {
        db.prepare(`
        INSERT INTO TodoList (title, sortOrder, boardId)
        VALUES (?, ?, ?)
       `).run(todoList.title, todoList.sortOrder, todoList.boardId);
    }

    updateRange(updatedTodoLists: TodoList[]): void {
        const updateStmt = db.prepare(`
            UPDATE TodoList
            SET title = ?, sortOrder = ? , boardId = ?
            WHERE id = ?
        `);

        const updateMany = db.transaction((lists: TodoList[]) => {
            for (const list of lists) {
                updateStmt.run(list.title, list.sortOrder, list.boardId, list.id);
            }
        });

        updateMany(updatedTodoLists);
    }

    remove(id: number): void {
        db.prepare(`
            DELETE FROM TodoList WHERE id = ?
        `).run(id);
    }

}