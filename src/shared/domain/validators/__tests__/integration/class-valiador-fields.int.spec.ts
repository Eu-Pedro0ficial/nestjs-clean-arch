import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { ClassValidatorFields } from '../../class-validator-fields';

class StubRules {
  @MaxLength(255) // DECORATORS
  @IsString() // DECORATORS
  @IsNotEmpty() // DECORATORS
  name: string;

  @IsNumber() // DECORATORS
  @IsNotEmpty() // DECORATORS
  price: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
  validate(data: any): boolean {
    return super.validate(new StubRules(data));
  }
}

describe('ClassValidatorFields integration tests', () => {
  it('Should validation with erros', () => {
    const validator = new StubClassValidatorFields();
    expect(validator.validate(null)).toBeFalsy();

    expect(validator.erros).toStrictEqual({
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ],
      price: [
        'price should not be empty',
        'price must be a number conforming to the specified constraints',
      ],
    });
  });

  it('Should validation without erros', () => {
    const validator = new StubClassValidatorFields();
    expect(validator.validate({ name: 'Jhon Doe', price: 12 })).toBeTruthy();

    expect(validator.validatedData).toStrictEqual(
      new StubRules({ name: 'Jhon Doe', price: 12 }),
    );
  });
});
