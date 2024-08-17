import { validate as uuidValidate } from 'uuid';
import { Entity } from '../../entity';

type StubProps = {
  prop1: string;
  prop2: number;
};

class StubEntity extends Entity<StubProps> {} // STUB -> PADRONIZAÇÃO DE CRIAÇÃO DE CLASSES DUBLE

describe('Entity unit tests', () => {
  it('Should set props and id', () => {
    const props = {
      prop1: 'Value 1',
      prop2: 1,
    };

    const entity = new StubEntity(props);

    expect(entity.props.prop1).toStrictEqual(props.prop1);
    expect(entity.props.prop2).toBe(props.prop2);
    expect(entity.__id).not.toBeNull();
    expect(uuidValidate(entity.__id)).toBeTruthy();
  });

  it('Should accept valid uuid', () => {
    const props = {
      prop1: 'Value 1',
      prop2: 1,
    };
    const id = 'd94c206d-f81f-413e-a4d4-0b1d9ae83b69';
    const entity = new StubEntity(props, id);

    expect(uuidValidate(entity.__id)).toBeTruthy();
    expect(entity.__id).toBe(id);
  });

  it('Should convert entity to a Javascript Object', () => {
    const props = {
      prop1: 'Value 1',
      prop2: 1,
    };
    const id = 'd94c206d-f81f-413e-a4d4-0b1d9ae83b69';
    const entity = new StubEntity(props, id);

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    });
  });
});
