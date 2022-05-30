import { Module } from '@nestjs/common';
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
