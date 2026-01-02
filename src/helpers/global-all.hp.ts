import { IsOptional } from 'class-validator';
import { TransformSort } from './transform-sort.hp';
import { TransformToNumber } from './transform-number.hp';

export class GlobalAllDto {
  @IsOptional()
  search: string;

  @IsOptional()
  @TransformToNumber()
  page: number;

  @IsOptional()
  @TransformToNumber()
  limit: number;

  @IsOptional()
  @TransformSort()
  order: any;
}