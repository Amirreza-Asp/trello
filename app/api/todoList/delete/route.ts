import { ITodoListRepository } from "@/repository/ITodoListRepository";
import { createRequestContainer } from "@/repository/requestContainer";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const id = Number(searchParams.get("id"));

        if (!id) {
            return NextResponse.json(
                { message: "id is required" },
                { status: 400 }
            );
        }

        const requestContainer = createRequestContainer()
        const todoListRepository = requestContainer.resolve<ITodoListRepository>('ITodoListRepository');

        todoListRepository.remove(id);

        return NextResponse.json({ status: 200 })
    }
    catch (err) {
        console.error("Error delete TodoLists:", err);
        return NextResponse.json({ error: err }, { status: 500 });
    }
}