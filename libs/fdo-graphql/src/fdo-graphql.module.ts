import { Module } from '@nestjs/common';
import { FdoGraphqlService } from './fdo-graphql.service';

@Module({
  providers: [FdoGraphqlService],
  exports: [FdoGraphqlService],
})
export class FdoGraphqlModule {}
