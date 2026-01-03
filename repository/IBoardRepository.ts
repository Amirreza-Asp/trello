import { Board } from "@/types/board";
import { TodoList } from "@/types/todoList";

export interface IBoardRepository {
    getBoard(): Board

    addTodoList(model: TodoList): void,
    removeTodoList(id: number): void,
    updateTodoListRange(todoLists: TodoList[]): void,
    removeTodoListCards(todoListId: number): void
}