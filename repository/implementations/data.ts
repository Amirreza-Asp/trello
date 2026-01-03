import { Board } from "@/types/board";

export let boardData: Board =
{
    id: 1,
    title: 'Demo App',
    todoLists: [
        {
            id: 1,
            title: 'Todo',
            todoCards: [
                { id: 1, title: 'Create interview Kanban', comments: [] },
                { id: 2, title: 'Review Drag & Drop', comments: [] },
            ]
        },
        {
            id: 2,
            title: 'In Progress',
            todoCards: [
                { id: 3, title: 'Set up Next.js project', comments: [] },
            ]
        },
        {
            id: 3,
            title: 'Done',
            todoCards: []
        },
    ]
}