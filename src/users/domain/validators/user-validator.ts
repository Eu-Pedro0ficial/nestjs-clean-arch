import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserTypes } from '../entities/user.entity';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';

export class UserRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  email: string;

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  constructor({ email, name, password, createdAt }: UserTypes) {
    Object.assign(this, { email, name, password, createdAt });
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserTypes): boolean {
    return super.validate(new UserRules(data ?? ({} as UserTypes)));
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator();
  }
}
