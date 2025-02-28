import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Product } from "src/products/entities/product.entity";
import { OrdersMinMax } from "../constants/min-max-values";
import mongoose, { HydratedDocument } from "mongoose";
import { ProductsMinMax } from "src/products/constants/min-max-values";

export type OrderDocument = HydratedDocument<Order>

@Schema()
class ProductWithQuantity {
  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: "Product",
    required: true
  })
  product: Product;
  //Salvando o nome do produto separadamente caso o produto original seja excluido ainda de para mostrar o nome
  @Prop({
    type: String, 
    minlength: ProductsMinMax.ProductNameMinLength, 
    maxlength: ProductsMinMax.ProductNameMaxLength, 
    required: true
  })
  productName: string;
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
  @Prop([{
    type: ProductWithQuantity,
    required: true
  }])
  productsWithQuantities: ProductWithQuantity[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
