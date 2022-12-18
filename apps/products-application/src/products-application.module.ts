import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';

const envFilePaths = ['.env.development', '.env.prod'];

const modules = [UsersModule, ProductsModule, SettingsModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFilePaths,
    }),
    ...modules,
  ],
})
export class ProductsApplicationModule {}
