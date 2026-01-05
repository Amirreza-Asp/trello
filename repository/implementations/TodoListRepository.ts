import { db } from "@/data/db";
import { TodoCardDto } from "@/types/todoCard";
import { TodoList, TodoListDto, UpdateTodoListTitleDto } from "@/types/todoList";
import { ITodoListRepository } from "../ITodoListRepository";

export class TodoListRepository implements ITodoListRepository {
    updateTitle(todoList: UpdateTodoListTitleDto): void {
        db.prepare(`
            UPDATE TodoList
            SET title = ?
            WHERE id = ?
        `).run(todoList.title, todoList.id)


    }
    getListByBoardId(boardId: number): TodoListDto[] {
        let todoListItems: TodoListDto[] = [];

        const todoLists = db
            .prepare("SELECT * FROM TodoList WHERE boardId = ? ORDER BY SortOrder")
            .all(boardId) as TodoList[];


        todoLists.forEach(todoList => {
            const todoCards = db
                .prepare(`SELECT 
                            t.*, 
                            (SELECT COUNT(*) FROM Comment c WHERE c.todoCardId = t.Id) AS commentsCount 
                          FROM TodoCard t 
                          WHERE t.todoListId = ? 
                          ORDER BY t.Id`)
                .all(todoList.id!) as TodoCardDto[];

            todoListItems.push(new TodoListDto(todoList, todoCards));
        })

        return todoListItems;
    }

    add(todoList: TodoList): number {
        const result = db.prepare(`
        INSERT INTO TodoList (title, sortOrder, boardId)
        VALUES (?, ?, ?)
       `).run(todoList.title, todoList.sortOrder, todoList.boardId);

        return result.lastInsertRowid as number;
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