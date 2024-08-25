import { Entity } from '../entities/entity';
import { NotFoundError } from '../erros/not-fount-error';
import { RepositoryInterface } from './repository-contracts';

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string): Promise<E> {
    return this.__get(id);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    await this.__get(entity.id);
    const index = await this.__getIndex(entity.id);
    this.items[index] = entity;
  }

  async delete(id: string): Promise<void> {
    await this.__get(id);
    const index = await this.__getIndex(id);
    this.items.splice(index, 1);
  }

  protected async __get(id: string): Promise<E> {
    const __id = `${id}`;
    const entity = this.items.find(item => item.id === __id);

    if (!entity) throw new NotFoundError('Entity not found');

    return entity;
  }

  protected async __getIndex(id: string): Promise<number> {
    return this.items.findIndex(item => item.id === id);
  }
}
