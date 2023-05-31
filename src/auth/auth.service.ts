import { hash, verify } from 'argon2';

import { ForbiddenException, Injectable } from '@nestjs/common';
import { ModelService } from '../model/model.service';
import { SignUpDto, SignInDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private model: ModelService) {}

  async signin(dto: SignInDto) {
    const user = await this.model.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User does not exist');
    }

    const isMatch = await verify(user.password, dto.password);

    if (!isMatch) {
      throw new ForbiddenException('Incorrect Password');
    }

    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;

    return {
      message: 'Success',
      user,
    };
  }

  async signup(dto: SignUpDto) {
    try {
      const passwordHash = await hash(dto.password);

      const user = await this.model.user.create({
        data: {
          email: dto.email,
          password: passwordHash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;

      return {
        message: 'Success',
        user,
      };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
