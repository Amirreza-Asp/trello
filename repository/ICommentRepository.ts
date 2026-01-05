import { Comment, CreateCommentDto } from "@/types/comment";

export interface ICommentRepository {
   getByTodoCardId(todoCardId: number): Comment[];
   add(model: CreateCommentDto): number


}