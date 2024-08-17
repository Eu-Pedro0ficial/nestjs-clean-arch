export type UserTypes = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
};

export class UserEntity {
  constructor(public readonly props: UserTypes) {
    this.props.createdAt = this.props.createdAt ?? new Date();
  }
}
