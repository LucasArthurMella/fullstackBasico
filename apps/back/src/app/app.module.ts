import { Module } from '@nestjs/common';
import { ProductsModule } from './../products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './../config/config';
import { OrdersModule } from './../orders/orders.module';
import { AuthModule } from './../auth/auth.module';
import { UsersModule } from './../users/users.module';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV == "production"
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get("mongoUri")
      })
    }),
    ProductsModule,
    OrdersModule,
    AuthModule,
    UsersModule,
    RedisCacheModule
  ],
})
export class AppModule {}
