import { faker } from '@faker-js/faker';
import { UserTypes } from '../../entities/user.entity';

type Props = {
  name?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
};

export function UserDataBuilder(props: Props): UserTypes {
  return {
    email: props.email ?? faker.internet.email(),
    name: props.name ?? faker.person.fullName(),
    password: props.password ?? faker.internet.password(),
    createdAt: props.createdAt ?? new Date(),
  };
}
