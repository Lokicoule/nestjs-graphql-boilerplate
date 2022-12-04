import { TransactionModule } from '@lib/fdo-database/mongodb/transaction/transaction.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../domain/entities/user/user.entity';
import { MongoDBProviderModule } from './providers/mongodb/mongodb.provider.module';
import { UserRepository } from './repositories/user/user.repository';

@Module({
  imports: [
    MongoDBProviderModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TransactionModule,
  ],
  providers: [UserRepository],
  exports: [UserRepository, TransactionModule],
})
export class PersistenceModule {}
