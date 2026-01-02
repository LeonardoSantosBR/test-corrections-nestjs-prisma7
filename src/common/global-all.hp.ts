import { IsOptional } from 'class-validator';
import { TransformSort } from '../helpers/transform-sort.hp';
import { TransformToNumber } from '../helpers/transform-number.hp';

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