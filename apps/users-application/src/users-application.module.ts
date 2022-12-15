import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersPresentationModule } from './users/presentation/users-presentation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.prod'],
    }),
    UsersPresentationModule,
  ],
})
export class UsersApplicationModule {}
