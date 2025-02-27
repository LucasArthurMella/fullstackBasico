import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {

  @InjectModel(Order.name) private orderModel: Model<Order>
  constructor(private readonly productsService: ProductsService){}

  async create(createOrderDto: CreateOrderDto) {
    const productsWithQuantities = await Promise.all(createOrderDto.productsWithQuantities.map(async currentProductWithQuantity => {
      const product = await this.productsService.findOne(currentProductWithQuantity.productId as string);
      
      if(product){
      const productWithQuantity = {
        productName: product.name,
        product: currentProductWithQuantity.productId,
        quantity: currentProductWithQuantity.quantity 
      }
      return productWithQuantity;
      }
      throw new BadRequestException(`Produto de id ${currentProductWithQuantity.productId} não existe!`)
    })); 
    const productsWithQuantitiesObject = {
      productsWithQuantities
    }
    const createdOrder = await this.orderModel.create(productsWithQuantitiesObject);
    return createdOrder;
  }

  async findAll() {
    const foundOrders = await this.orderModel.find({}).populate("productsWithQuantities.product");
    return foundOrders;
  }

  async findOne(id: string) {
    const foundOrder = await this.orderModel.findById(id);
    return foundOrder;
  }
}
