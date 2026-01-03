'use server'

import { ITodoCardRepository } from '@/repository/ITodoCardRepository'
import { ITodoListRepository } from '@/repository/ITodoListRepository'
import { createRequestContainer } from '@/repository/requestContainer'
import { TodoList } from '@/types/todoList'
import { revalidatePath } from 'next/cache'

export async function createList(title: string, boardId: number) {
  const requestContainer = createRequestContainer()
  const todoListRepository = requestContainer.resolve<ITodoListRepository>('ITodoListRepository');

  let todoList: TodoList = {
    id: Math.random(),
    title: title,
    boardId: boardId
  }

  todoListRepository.add(todoList)

  revalidatePath('/')
}


export async function removeTodoCardsByTodoListId(todoListId: number) {
  const requestContainer = createRequestContainer()
  const todoCardRepository = requestContainer.resolve<ITodoCardRepository>('ITodoCardRepository');

  todoCardRepository.removeRangeByTodoListId(todoListId);

  revalidatePath('/')
}

