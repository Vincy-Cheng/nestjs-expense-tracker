import { ApiProperty, PickType } from '@nestjs/swagger';
import { Account } from '../entities/account.entity';
import { User } from '../../users/entities/user.entity';

export class CreateAccountDto extends PickType(Account, ['name', 'currency']) {
  @ApiProperty({ type: () => User })
  user: User;
}
