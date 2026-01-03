import { db } from "@/data/db";
import type { Board } from "@/types/board";
import { injectable } from 'tsyringe';
import { IBoardRepository } from "../IBoardRepository";

@injectable()
export class BoardRepository implements IBoardRepository {
    getFirstBoard(): Board {
        const board = db.prepare("SELECT * FROM Board ORDER BY id LIMIT 1").get() as Board;
        return board;
    }
}