import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]), RedisCacheModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
