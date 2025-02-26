import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {

  @InjectModel(Order.name) private orderModel: Model<Order>
  constructor(){}

  async create(createOrderDto: CreateOrderDto) {
    const productsWithQuantities = createOrderDto.productsWithQuantities.map(currentProductWithQuantity => {
      const productWithQuantity = {
        product: currentProductWithQuantity.productId,
        quantity: currentProductWithQuantity.quantity 
      }
      return productWithQuantity;
    }); 
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
