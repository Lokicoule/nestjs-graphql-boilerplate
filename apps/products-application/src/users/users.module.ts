import { Module } from '@nestjs/common';
import { UsersPresentationModule } from './presentation/users-presentation.module';

@Module({
  imports: [UsersPresentationModule],
  exports: [UsersPresentationModule],
})
export class UsersModule {}
