import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { CategoryEnum } from './category.enum';
export class EmployeeDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  middleName: string;

  @IsNotEmpty()
  @IsString()
  position: string;
}

export class ProductDTO {
    @IsNotEmpty()
    @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(CategoryEnum, { message: 'Invalid category value' })
  category: string;


  @IsNotEmpty()
  @IsNumber()
  amount: number;


  @IsNotEmpty()
  @IsNumber()
  price: number;
}
