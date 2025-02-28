import {  Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Cacheable } from 'cacheable';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class ProductsService {
  
  @InjectModel(Product.name) private productModel: Model<Product>
  @InjectModel(Order.name) private orderModel: Model<Order>
  constructor(
    @Inject("CACHE_INSTANCE") private readonly cache: Cacheable
  )
  {}

  async create(createProductDto: CreateProductDto) {
    const createdProduct = await this.productModel.create(createProductDto);
    await this.cache.delete("all_products");
    return createdProduct;
  }

  async findAll() {
    const cacheKey = "all_products";
    const cachedData = await this.cache.get(cacheKey);
    if(cachedData){
      console.log("Returning cached data");
      return JSON.parse(cachedData as any);
    }
    const foundProducts = await this.productModel.find({}).lean();
    await this.cache.set(cacheKey, JSON.stringify(foundProducts), 60 * 60 * 1000);
    return foundProducts;
  }

  async findOne(id: string) {
    const foundProduct = await this.productModel.findById(id);
    return foundProduct;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const oldProduct = await this.productModel.findById(id);
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, {new: true});
  

   if (updatedProduct.name !== oldProduct.name) {
    // Mudando o dado fixo do nome do produto de todos os orders que possuem esse produto,
    await this.orderModel.updateMany(
      { "productsWithQuantities.product": id }, 
      { $set: { "productsWithQuantities.$[elem].productName": updateProductDto.name } },
      { arrayFilters: [{ "elem.product": new mongoose.Types.ObjectId(id) }] }
    );
    }

    await this.cache.delete("all_products");
    return updatedProduct;
  }

  async remove(id: string) {
    const removedProduct = await this.productModel.findByIdAndDelete(id);
    await this.cache.delete("all_products");
    return removedProduct;
  }
}
