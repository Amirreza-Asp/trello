'use server'

import { IBoardRepository } from '@/repository/IBoardRepository'
import { createRequestContainer } from '@/repository/requestContainer'
import { TodoList } from '@/types/todoList'
import { revalidatePath } from 'next/cache'

export async function createList(title: string) {
  const requestContainer = createRequestContainer()
  const boardRepository = requestContainer.resolve<IBoardRepository>('IBoardRepository');

  let todoList : TodoList = {
    id : Math.random(),
    title : title,
    todoCards : []
  }

  boardRepository.addTodoList(todoList)

  revalidatePath('/')
}

export async function deleteList(id : number){
  const requestContainer = createRequestContainer()
  const boardRepository = requestContainer.resolve<IBoardRepository>('IBoardRepository');
  boardRepository.removeTodoList(id);

  revalidatePath('/')
}


export async function updateTodoLists(todoLists : TodoList[]){
  const requestContainer = createRequestContainer()
  const boardRepository = requestContainer.resolve<IBoardRepository>('IBoardRepository');
  boardRepository.updateTodoListRange(todoLists);

  revalidatePath('/')
}


