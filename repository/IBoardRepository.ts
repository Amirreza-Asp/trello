import { Board } from "@/types/board";

export interface IBoardRepository {
    getFirstBoard(): Board
}