import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateCatDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsInt()
  @IsOptional()
  age: number;

  @IsString()
  @IsOptional()
  breed: string;
}
