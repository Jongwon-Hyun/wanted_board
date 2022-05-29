import { Module } from '@nestjs/common';
import { BaseEntity } from '@common/entity/base.entity';
import { Bcrypt } from './util/bcrypt';

@Module({
  imports: [],
  controllers: [],
  providers: [
    Bcrypt,
  ],
  exports: [
    Bcrypt,
  ],
})
export class CommonModule {}
