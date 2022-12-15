import { Injectable } from '@nestjs/common';
import { UserDto } from './facade/dtos/user.dto';

@Injectable()
export class UsersService {
  private users: UserDto[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Richard Roe' },
  ];

  findById(id: number): UserDto {
    return this.users.find((user) => user.id === Number(id));
  }
}
