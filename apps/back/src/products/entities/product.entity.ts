import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ProductsMinMax } from "../constants/min-max-values";

export type ProductDocument = HydratedDocument<Product>

@Schema({timestamps: true})
export class Product {

@Prop({
  type: String,
  minlength: ProductsMinMax.ProductNameMinLength,
  maxlength: ProductsMinMax.ProductNameMaxLength,
  required: true
})
name: String

@Prop({
  type: String,
  minlength: ProductsMinMax.ProductDescriptionMinLength,
  maxlength: ProductsMinMax.ProductDescriptionMaxLength,
  required: true
})
description: String

@Prop({
  type: Number,
  minlength: ProductsMinMax.ProductPriceMin,
  maxlength: ProductsMinMax.ProductPriceMax,
  required: true
})
price: number

}

export const ProductSchema = SchemaFactory.createForClass(Product);
