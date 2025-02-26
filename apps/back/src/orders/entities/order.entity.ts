import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Product } from "src/products/entities/product.entity";
import { OrdersMinMax } from "../constants/min-max-values";
import mongoose, { HydratedDocument } from "mongoose";

export type OrderDocument = HydratedDocument<Order>

@Schema()
class ProductWithQuantity {

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: "Product",
    required: true
  })
  product: Product;
  @Prop({
    type: Number, 
    min: OrdersMinMax.OrderQuantityMin, 
    max: OrdersMinMax.OrderQuantityMax, 
    required: true
  })
  quantity: number;
}

@Schema({timestamps: true})
export class Order {
  @Prop([{type: ProductWithQuantity, required: true}])
  productsWithQuantities: ProductWithQuantity[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
