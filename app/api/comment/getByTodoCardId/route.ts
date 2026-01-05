import { ICommentRepository } from "@/repository/ICommentRepository";
import { ITodoCardRepository } from "@/repository/ITodoCardRepository";
import { createRequestContainer } from "@/repository/requestContainer";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const todoCardId = Number(searchParams.get("todoCardId"));

    if (!todoCardId) {
        return NextResponse.json(
            { message: "todoCardtId is required" },
            { status: 400 }
        );
    }

    const requestContainer = createRequestContainer()
    const commentRepository = requestContainer.resolve<ICommentRepository>('ICommentRepository');

    const data = commentRepository.getByTodoCardId(todoCardId);

    return NextResponse.json({ data: data }, { status: 200 })
}