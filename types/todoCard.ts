export interface TodoCard {
    id?: number,
    title: string,
    todoListId: number
}

export interface TodoCardDto{
    id: number,
    title: string,
    todoListId: number,
    commentsCount : number,
}

export class TodoCardDto implements TodoCardDto{
    constructor(todoCard : TodoCard){
        this.id = todoCard.id!;
        this.title = todoCard.title;
        this.todoListId = todoCard.todoListId;
        this.commentsCount = 0;
    }
}