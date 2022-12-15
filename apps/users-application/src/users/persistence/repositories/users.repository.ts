import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Repository } from '@lib/fdo-database/mongodb/repository';

import { User } from 'apps/users-application/src/users/domain/entities/user/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(@InjectModel(User.name) private readonly _model: Model<User>) {
    super(_model);
  }
}
