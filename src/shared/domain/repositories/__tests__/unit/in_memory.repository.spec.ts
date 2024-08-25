import { Entity } from '@/shared/domain/entities/entity';
import { InMemoryRepository } from '../../in-memory.repository';
import { NotFoundError } from '@/shared/domain/erros/not-fount-error';
type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}
class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('In Memory Repository unit tests', () => {
  let sut: StubInMemoryRepository;
  beforeEach(() => {
    sut = new StubInMemoryRepository();
  });

  it('Should inserts a new entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 200 });

    await sut.insert(entity);
    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON());
  });

  it('Should throw error when entity not found', async () => {
    await expect(sut.findById('fake id')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should find a entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 200 });

    await sut.insert(entity);
    const output = await sut.findById(entity.__id);
    expect(entity.toJSON()).toStrictEqual(output.toJSON());
  });

  it('Should return all entities', async () => {
    const entity = new StubEntity({ name: 'test name', price: 200 });

    await sut.insert(entity);
    const output = await sut.findAll();
    expect([entity]).toStrictEqual(output);
  });

  it('Should throw error on updated when entity not found', async () => {
    const entity = new StubEntity({ name: 'test name', price: 200 });
    await expect(sut.update(entity)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should update an entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 200 });

    await sut.insert(entity);
    const stubEntity = new StubEntity(
      { name: 'Other name', price: 400 },
      entity.__id,
    );

    await sut.update(stubEntity);
    expect(stubEntity.toJSON()).toStrictEqual(sut.items[0].toJSON());
  });

  it('Should throw error when entity not found while using delete method', async () => {
    await expect(sut.delete('fake id')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should delete an entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 200 });

    await sut.insert(entity);
    await sut.delete(entity.__id);

    expect(sut.items).toHaveLength(0);
  });
});
