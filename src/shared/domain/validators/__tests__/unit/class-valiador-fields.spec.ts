import { ClassValidatorFields } from '../../class-validator-fields';
import * as libClassValidator from 'class-validator';

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string;
}> {}

describe('ClassValidatorFields unit tests', () => {
  it('Should initialize erros and validatedData variables with null ', () => {
    const sut = new StubClassValidatorFields();

    expect(sut.erros).toBeNull();
    expect(sut.validatedData).toBeNull();
  });

  it('Should validate with erros', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync'); // Verificando se o método validateSync existe no objeto todo.
    spyValidateSync.mockReturnValue([
      { property: 'field', constraints: { isRequired: 'tests error' } },
    ]);
    const sut = new StubClassValidatorFields();
    expect(sut.validate(null)).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(sut.validatedData).toBeNull();
    expect(sut.erros).toStrictEqual({ field: ['tests error'] });
  });

  it('Should validate without erros', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync'); // Verificando se o método validateSync existe no objeto todo.
    spyValidateSync.mockReturnValue([]);
    const sut = new StubClassValidatorFields();
    expect(sut.validate({ field: 'value' })).toBeTruthy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(sut.validatedData).toStrictEqual({ field: 'value' });
    expect(sut.erros).toBeNull();
  });
});
