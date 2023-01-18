import { Module } from '@nestjs/common';
import { DataModule } from '~/data/data.module';

@Module({
  imports: [DataModule],
})
export class DomainModule {}
