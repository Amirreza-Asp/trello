import { ITodoListRepository } from "@/repository/ITodoListRepository";
import { createRequestContainer } from "@/repository/requestContainer";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const boardId = Number(searchParams.get("boardId"));

    if (!boardId) {
        return NextResponse.json(
            { message: "boardId is required" },
            { status: 400 }
        );
    }

    const requestContainer = createRequestContainer()
    const todoListRepository = requestContainer.resolve<ITodoListRepository>('ITodoListRepository');

    const data = todoListRepository.getListByBoardId(boardId);

    return NextResponse.json({ data: data })
}