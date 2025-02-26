import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsMongoId, IsNotEmpty, IsNumber, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import { OrdersMinMax } from "../constants/min-max-values";


class ProductWithQuantity{

  @IsMongoId()
  @IsNotEmpty()
  @MinLength(OrdersMinMax.ProductIdMinLength)
  @MaxLength(OrdersMinMax.ProductIdMaxLength)
  productId: String;

  @IsNotEmpty()
  @IsNumber()
  @Min(OrdersMinMax.OrderQuantityMin)
  @Max(OrdersMinMax.OrderQuantityMax)
  quantity: Number;
}


export class CreateOrderDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => ProductWithQuantity)
  productsWithQuantities: ProductWithQuantity[]
}
