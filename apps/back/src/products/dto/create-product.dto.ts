import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { ProductsMinMax } from "../constants/min-max-values";

export class CreateProductDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(ProductsMinMax.ProductNameMinLength)
  @MaxLength(ProductsMinMax.ProductNameMaxLength)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(ProductsMinMax.ProductDescriptionMinLength)
  @MaxLength(ProductsMinMax.ProductDescriptionMaxLength)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(ProductsMinMax.ProductPriceMin)
  @Max(ProductsMinMax.ProductPriceMax)
  price: number;
  
}
