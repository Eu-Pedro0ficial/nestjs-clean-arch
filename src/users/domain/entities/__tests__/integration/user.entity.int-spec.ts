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

      props = {
        ...UserDataBuilder({}),
        name: 10 as any,
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('Should throw an error when creating a user with invalid email', () => {
      let props: UserTypes = {
        ...UserDataBuilder({}),
        email: null,
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        email: '',
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        email: 'a'.repeat(260),
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        email: 10 as any,
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('Should throw an error when creating a user with invalid password', () => {
      let props: UserTypes = {
        ...UserDataBuilder({}),
        password: null,
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        password: '',
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        password: 'a'.repeat(110),
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        password: 10 as any,
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('Should throw an error when creating a user with invalid createdAt', () => {
      let props: UserTypes = {
        ...UserDataBuilder({}),
        createdAt: '2023' as any,
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        createdAt: 10 as any,
      };

      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('Should is valid user', () => {
      expect.assertions(0); // verifica quantas asserções você espera que tenha nesse teste após executado.
      const props: UserTypes = {
        ...UserDataBuilder({}),
      };
      new UserEntity(props);
    });
  });
});
