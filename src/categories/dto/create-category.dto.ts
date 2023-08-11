import { ApiProperty, PickType } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

export class CreateCategoryDto extends PickType(Category, ['name', 'icon']) {
  @ApiProperty({ type: 'number' })
  userId: number;
}
