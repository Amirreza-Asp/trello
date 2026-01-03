import type { Board } from "@/types/board";
import { TodoList } from "@/types/todoList";
import { injectable } from 'tsyringe';
import { IBoardRepository } from "../IBoardRepository";
import { boardData } from "./data";
import BoardHeader from "@/components/board/board-header";

@injectable()
export class FileBoardRepository implements IBoardRepository {
    removeTodoListCards(todoListId: number): void {
        boardData.todoLists.find(list => list.id == todoListId)!.todoCards = []
    }
    getBoard(): Board {
        return boardData;
    }

    addTodoList(model: TodoList) {
        boardData.todoLists.push(model);
    }

    removeTodoList(id: number) {
        console.log(id);
        boardData.todoLists = boardData.todoLists.filter(list => list.id != id);
    }

    updateTodoListRange(todoLists: TodoList[]): void {
        boardData.todoLists = todoLists;
    }

}