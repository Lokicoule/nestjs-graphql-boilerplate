import { Repository } from '@lib/fdo-database/mongodb/repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting } from '../../../domain/entities/Setting/Setting.entity';

@Injectable()
export class SettingRepository extends Repository<Setting> {
  constructor(
    @InjectModel(Setting.name) private readonly _model: Model<Setting>,
  ) {
    super(_model);
  }
}
