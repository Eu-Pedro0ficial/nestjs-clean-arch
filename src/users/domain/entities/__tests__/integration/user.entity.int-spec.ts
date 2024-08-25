import { UserEntity, UserTypes } from '../../user.entity';
import { UserDataBuilder } from '../../../testing/helpers/user-data-builder';
import { EntityValidationError } from '@/shared/domain/erros/validation-error';

describe('User entity intregration testes', () => {
  describe('Constructor method', () => {
    it('Should throw an error when creating a user with invalid name', () => {
      let props: UserTypes = {
        ...UserDataBuilder({}),
        name: null,
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        name: '',
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        name: 'a'.repeat(260),
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });
  });
});
