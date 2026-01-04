import { ITodoListRepository } from "@/repository/ITodoListRepository";
import { createRequestContainer } from "@/repository/requestContainer";
import type { TodoList } from "@/types/todoList";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body: TodoList = await req.json();

        if (!body) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        const requestContainer = createRequestContainer()
        const todoListRepository = requestContainer.resolve<ITodoListRepository>('ITodoListRepository');

        todoListRepository.add(body);

        return NextResponse.json({ message: "TodoLists create successfully" });
    } catch (err) {
        console.error("Error creating TodoLists:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
