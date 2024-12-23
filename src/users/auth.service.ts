import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_script);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    //Generate salt
    const salt = randomBytes(8).toString('hex');
    //Hash
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    //join salt and hash with salt
    const result = salt + '.' + hash.toString('hex');
    //create user
    const user = await this.usersService.create(email, result);
    // return user
    return user;
  }

  async signin(email: string, password: string) {
    //First element in array
    const [user] = await this.usersService.find(email);
    // console.info('test ', user, await this.usersService.find(email));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [salt, storeHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storeHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    return user;
  }
}
