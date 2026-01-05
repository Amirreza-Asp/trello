import { ITodoListRepository } from "@/repository/ITodoListRepository";
import { createRequestContainer } from "@/repository/requestContainer";
import type { TodoList, UpdateTodoListTitleDto } from "@/types/todoList";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const body: UpdateTodoListTitleDto = await req.json();

        if (!body) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        const requestContainer = createRequestContainer()
        const todoListRepository = requestContainer.resolve<ITodoListRepository>('ITodoListRepository');

        todoListRepository.updateTitle(body);

        return NextResponse.json({ message: "TodoLists updated successfully" });
    } catch (err) {
        console.error("Error updating TodoLists:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
