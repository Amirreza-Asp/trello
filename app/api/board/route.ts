import { IBoardRepository } from '@/repository/IBoardRepository';
import { createRequestContainer } from '@/repository/requestContainer';
import { NextResponse } from 'next/server';

export async function GET() {
    const requestContainer = createRequestContainer()
    const boardRepository = requestContainer.resolve<IBoardRepository>('IBoardRepository');

    const board = boardRepository.getFirstBoard();

    return NextResponse.json({ data: board }, { status: 200 })
}