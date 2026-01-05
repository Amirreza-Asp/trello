import { ITodoCardRepository } from "@/repository/ITodoCardRepository";

import { createRequestContainer } from "@/repository/requestContainer";
import { TodoCard } from "@/types/todoCard";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body: TodoCard = await req.json();

        if (!body) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        const requestContainer = createRequestContainer()
        const todoCardRepository = requestContainer.resolve<ITodoCardRepository>('ITodoCardRepository');

        const id = todoCardRepository.add(body);

        return NextResponse.json({ id: id, message: "TodoCard create successfully" });
    } catch (err) {
        console.error("Error creating TodoCard:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
