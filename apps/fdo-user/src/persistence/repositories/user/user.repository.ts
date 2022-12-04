import { Repository } from '@lib/fdo-database/mongodb/repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../domain/entities/user/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(@InjectModel(User.name) private readonly _model: Model<User>) {
    super(_model);
  }
}
