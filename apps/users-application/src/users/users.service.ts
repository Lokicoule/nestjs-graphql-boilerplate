/* import { Injectable } from '@nestjs/common';
import { UserDto } from './facade/dtos/user.dto';

@Injectable()
export class UsersService {
  private users: UserDto[] = [
    { id: 'id_1', name: 'John Doe' },
    { id: 'id_2', name: 'Richard Roe' },
  ];

  findById(id: string): UserDto {
    return this.users.find((user) => user.id === id);
  }
}
 */
