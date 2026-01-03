import type { Board } from "@/types/board";
import { TodoList } from "@/types/todoList";
import { injectable } from 'tsyringe';
import { IBoardRepository } from "../IBoardRepository";
import { boardData } from "./data";

@injectable()
export class FileBoardRepository implements IBoardRepository {
    getBoard(): Board {
        return boardData;
    }

    addTodoList(model: TodoList) {
        boardData.todoLists.push(model);
    }

    removeTodoList(id: number) {
        boardData.todoLists = boardData.todoLists.filter(list => list.id != id);
    }

    updateTodoListRange(todoLists: TodoList[]): void {
        boardData.todoLists = todoLists;
    }

}