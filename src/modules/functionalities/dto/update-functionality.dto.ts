import { PartialType } from '@nestjs/swagger';
import { CreateFunctionalityDto } from './create-functionality.dto';

export class UpdateFunctionalityDto extends PartialType(CreateFunctionalityDto) {}
