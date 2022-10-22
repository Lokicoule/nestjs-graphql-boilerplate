import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from '../domain/entities/customer.entity';
import { PersistenceProvidersModule } from './providers/persistence.providers.module';
import { CustomerRepository } from './repositories/customer/customer.repository';

@Module({
  imports: [
    PersistenceProvidersModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  providers: [CustomerRepository],
  exports: [CustomerRepository],
})
export class PersistenceModule {}
