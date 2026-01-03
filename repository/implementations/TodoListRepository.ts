import { db } from "@/data/db";
import { TodoList } from "@/types/todoList";
import { ITodoListRepository } from "../ITodoListRepository";

export class TodoListRepository implements ITodoListRepository {
    getListByBoardId(boardId: number): TodoList[] {
        const todoLists = db
            .prepare("SELECT * FROM TodoList WHERE boardId = ? ORDER BY SortOrder")
            .all(boardId) as TodoList[];

        return todoLists;
    }

    add(todoList: TodoList): void {
        const jsonTodoLists = localStorage.get('todoLists');
        let todoLists = JSON.parse(jsonTodoLists) as TodoList[];

        todoLists.push(todoList);

        localStorage.set('todoLists', JSON.stringify(todoLists));
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