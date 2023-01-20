import { CustomersDeletingResolver } from './customers-deleting.resolver';
import { CustomersReadingResolver } from './customers-reading.resolver';
import { CustomersWritingResolver } from './customers-writing.resolver';

export const customersResolvers = [
  CustomersDeletingResolver,
  CustomersReadingResolver,
  CustomersWritingResolver,
];
