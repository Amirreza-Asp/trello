import { db } from "@/data/db";
import { ICommentRepository } from "../ICommentRepository";
import { Comment } from "@/types/comment";

export class CommentRepository implements ICommentRepository {
    add(model: Comment): number {
        const result = db.prepare(`
            INSERT INTO Comment (content, todoCardId, author, createdAt , isMine)
            VALUES (?, ?, ?, ?, ?)
       `).run(model.content, model.todoCardId, model.author, new Date(model.createdAt).toISOString(), model.isMine ? 1 : 0);

        return result.lastInsertRowid as number;
    }

    getByTodoCardId(todoCardId: number): Comment[] {
        return db.prepare("SELECT * FROM Comment WHERE todoCardId = ?").all(todoCardId) as Comment[];
    }


}