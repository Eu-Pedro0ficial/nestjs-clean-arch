import { validateSync } from 'class-validator';
import {
  FieldsErros,
  ValidatorsFieldsInterface,
} from './validator-fields.interface';
import { error } from 'console';

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorsFieldsInterface<PropsValidated>
{
  erros: FieldsErros = null;
  validatedData: PropsValidated = null;
  validate(data: any): boolean {
    const errors = validateSync(data);
    if (errors.length) {
      this.erros = {};
      for (const error of errors) {
        const field = error.property;
        this.erros[field] = Object.values(error.constraints);
      }
    } else {
      this.validatedData = data;
    }
    return !error.length;
  }
}
