export interface Comment {
    id?: number,
    content: string,
    createdAt: Date,
    author: string,
    isMine: boolean,
    todoCardId: number
}

export interface CreateCommentDto {
    content: string,
    todoCardId: number
}

export class Comment implements Comment {
    constructor(createCommentDto: CreateCommentDto) {
        this.author = "parisa";
        this.content = createCommentDto.content;
        this.createdAt = new Date();
        this.isMine = true;
        this.todoCardId = createCommentDto.todoCardId
    }
}
