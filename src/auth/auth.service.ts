import { hash } from 'argon2';

import { Injectable } from '@nestjs/common';
import { ModelService } from '../model/model.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private model: ModelService) {}

  signin(dto: AuthDto) {
    return 'in';
  }

  async signup(dto: AuthDto) {
    const passwordHash = await hash(dto.password);

    const user = await this.model.user.create({
      data: {
        email: dto.email,
        password: passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    return {
      message: 'Success',
      user,
    };
  }
}
