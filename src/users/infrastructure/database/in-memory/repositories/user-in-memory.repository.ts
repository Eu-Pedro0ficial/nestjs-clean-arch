import { ConflictError } from '@/shared/domain/erros/conflict_error';
import { NotFoundError } from '@/shared/domain/erros/not-fount-error';
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory.repository';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';

export class UserInMemoryRepository
  extends InMemoryRepository<UserEntity>
  implements UserRepository
{
  async findByEmail(email: string): Promise<UserEntity> {
    const __email = `${email}`;
    const entity = this.items.find(item => item.id === __email);
    if (!entity)
      throw new NotFoundError(`Entity not found using email ${__email}`);
    return entity;
  }

  async emailExists(email: string): Promise<void> {
    const __email = `${email}`;
    const entity = this.items.find(item => item.id === __email);

    if (entity) throw new ConflictError(`Email address already used`);
  }
}
