import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from '../../user-validator';

let sut: UserValidator;

describe('User validator unit tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create();
  });

  describe('Name field', () => {
    it('Invalidations cases for name field', () => {
      let isValid = sut.validate(null);
      expect(isValid).toBeFalsy();
      expect(sut.erros['name']).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({ ...UserDataBuilder({}), name: '' });
      expect(isValid).toBeFalsy();
      expect(sut.erros['name']).toStrictEqual(['name should not be empty']);

      isValid = sut.validate({ ...UserDataBuilder({}), name: 10 as any });
      expect(isValid).toBeFalsy();
      expect(sut.erros['name']).toStrictEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        ...UserDataBuilder({}),
        name: 'a'.repeat(260) as any,
      });
      expect(isValid).toBeFalsy();
      expect(sut.erros['name']).toStrictEqual([
        'name must be shorter than or equal to 255 characters',
      ]);
    });

    it('valid case for name field', () => {
      const props = UserDataBuilder({});
      const isValid = sut.validate(props);
      expect(isValid).toBeTruthy();
      expect(sut.validatedData).toStrictEqual(new UserRules(props));
    });
  });
});
