import { ITodoCardRepository } from "@/repository/ITodoCardRepository";
import { createRequestContainer } from "@/repository/requestContainer";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const todoListId = Number(searchParams.get("todoListId"));

    if (!todoListId) {
        return NextResponse.json(
            { message: "todoListId is required" },
            { status: 400 }
        );
    }

    const requestContainer = createRequestContainer()
    const todoCardRepository = requestContainer.resolve<ITodoCardRepository>('ITodoCardRepository');

    const data = todoCardRepository.getByTodoListId(todoListId);

    return NextResponse.json({ data: data }, { status: 200 })
}