import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Customer,
  CustomerSchema,
} from '../domain/entities/customer/customer.entity';
import { MongoDBProviderModule } from './providers/mongodb/mongodb.provider.module';
import { CustomerRepository } from './repositories/customer/customer.repository';

@Module({
  imports: [
    MongoDBProviderModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  providers: [CustomerRepository],
  exports: [CustomerRepository],
})
export class PersistenceModule {}
