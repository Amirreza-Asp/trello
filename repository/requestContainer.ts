import 'reflect-metadata';
import { container, DependencyContainer } from 'tsyringe';
import { IBoardRepository } from './IBoardRepository';
import { BoardRepository } from './implementations/BoardRepository';
import { TodoCardRepository } from './implementations/TodoCardRepository';
import { TodoListRepository } from './implementations/TodoListRepository';
import { ITodoCardRepository } from './ITodoCardRepository';
import { ITodoListRepository } from './ITodoListRepository';

export function createRequestContainer(): DependencyContainer {
  const requestContainer = container.createChildContainer()

  requestContainer.register<IBoardRepository>('IBoardRepository', {
    useClass: BoardRepository
  });

  requestContainer.register<ITodoListRepository>('ITodoListRepository' , {
    useClass : TodoListRepository
  })

  requestContainer.register<ITodoCardRepository>('ITodoCardRepository' , { 
    useClass : TodoCardRepository
  })

  return requestContainer
}
