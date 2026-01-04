
export let boardData = [{
    id: 1,
    title: 'Demo App'
}]

export let todoListData = [
    { id: 1, title: 'Todo', boardId: 1, sortOrder: 1 },
    { id: 2, title: 'In Progress', boardId: 1, sortOrder: 2 },
    { id: 3, title: 'Done', boardId: 1, sortOrder: 3 },
]

export let todoCardData = [
    { id: 1, title: 'Create interview Kanban', todoListId: 1 },
    { id: 2, title: 'Review Drag & Drop', todoListId: 1 },
    { id: 3, title: 'Set up Next.js project', todoListId: 2 },
]

export let commentData = [
    { id: 1, content: 'hello world', createdAt: new Date(), author: 'amir', isMine: false, todoCardId: 1 },
    { id: 2, content: 'hello', createdAt: new Date(), author: 'parisa', isMine: true, todoCardId: 1 },
    { id: 3, content: 'yes', createdAt: new Date(), author: 'parisa', isMine: true, todoCardId: 3 },
]

