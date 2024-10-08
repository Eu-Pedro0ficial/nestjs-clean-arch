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

  describe('Update method', () => {
    it('Should throw an error when update a user with invalid name', () => {
      const entity = new UserEntity(UserDataBuilder({}));
      expect(() => entity.update(null as any)).toThrow(EntityValidationError);
      expect(() => entity.update('')).toThrow(EntityValidationError);
      expect(() => entity.update(10 as any)).toThrow(EntityValidationError);
      expect(() => entity.update('a'.repeat(260))).toThrow(
        EntityValidationError,
      );
    });

    it('Should is valid user', () => {
      expect.assertions(0); // verifica quantas asserções você espera que tenha nesse teste após executado.
      const props: UserTypes = {
        ...UserDataBuilder({}),
      };
      const entity = new UserEntity(props);
      entity.update('Other name');
    });
  });

  describe('UpdatePassword method', () => {
    it('Should a invalid user using invalid password field', () => {
      const entity = new UserEntity(UserDataBuilder({}));
      expect(() => entity.updatePassword(null as any)).toThrow(
        EntityValidationError,
      );
      expect(() => entity.updatePassword('')).toThrow(EntityValidationError);
      expect(() => entity.updatePassword(10 as any)).toThrow(
        EntityValidationError,
      );
      expect(() => entity.updatePassword('a'.repeat(110))).toThrow(
        EntityValidationError,
      );
    });

    it('Should is valid user', () => {
      expect.assertions(0); // verifica quantas asserções você espera que tenha nesse teste após executado.
      const props: UserTypes = {
        ...UserDataBuilder({}),
      };
      const entity = new UserEntity(props);
      entity.updatePassword('Other password');
    });
  });
});
