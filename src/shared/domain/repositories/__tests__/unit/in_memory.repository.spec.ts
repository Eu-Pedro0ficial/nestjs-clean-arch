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
});
