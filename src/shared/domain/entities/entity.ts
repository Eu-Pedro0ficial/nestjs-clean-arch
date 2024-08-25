import { v4 as uuidv4 } from 'uuid';

export abstract class Entity<Props = any> {
  public readonly __id: string;
  public readonly props: Props;

  constructor(props: Props, id?: string) {
    this.props = props;
    this.__id = id || uuidv4();
  }

  get id() {
    return this.__id;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.__id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
