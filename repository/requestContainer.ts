import 'reflect-metadata'
import { container, DependencyContainer } from 'tsyringe'
import { IBoardRepository } from './IBoardRepository'
import { FileBoardRepository } from './implementations/fileBoardRepository'

export function createRequestContainer(): DependencyContainer {
  const requestContainer = container.createChildContainer()

  requestContainer.register<IBoardRepository>('IBoardRepository', {
    useClass: FileBoardRepository
  });

  return requestContainer
}
