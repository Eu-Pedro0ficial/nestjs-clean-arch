export type FieldsErros = {
  [field: string]: string[];
};

export interface ValidatorsFieldsInterface<PropsValidated> {
  erros: FieldsErros;
  validatedData: PropsValidated;
  validate(data: any): boolean;
}
