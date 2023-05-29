import { Injectable } from '@nestjs/common';
import { ModelService } from '../model/model.service';

@Injectable()
export class AuthService {
  constructor(private model: ModelService) {}

  signin() {
    return { msg: 'SignIn' };
  }

  signup() {
    return { msg: 'SignUp' };
  }
}
