import { BaseEntity } from '@common/entity/base.entity';
import { Post } from '@post/domain/entity/post.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notices')
export class Notice extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  writer: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  keword: string;
}