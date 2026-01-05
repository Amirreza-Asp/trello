import { ICommentRepository } from "@/repository/ICommentRepository";


import { createRequestContainer } from "@/repository/requestContainer";
import { Comment, CreateCommentDto } from "@/types/comment";
;

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body: CreateCommentDto = await req.json();

        if (!body) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        const requestContainer = createRequestContainer()
        const commentRepository = requestContainer.resolve<ICommentRepository>('ICommentRepository');
        const comment = new Comment(body);

        const id = commentRepository.add(comment);


        return NextResponse.json({ id: id, message: "comment create successfully" });
    } catch (err) {
        console.error("Error creating comment:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
