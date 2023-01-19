import { Module } from '@nestjs/common';
import { DataModule } from '~/data';

@Module({
  imports: [DataModule],
})
export class DomainModule {}
