import { BaseEntity } from '@common/entity/base.entity';
import { Reply } from '@reply/domain/entity/reply.entity';
import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Index({ unique: false })
  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Index({ unique: false })
  @Column({ type: 'varchar', length: 20, nullable: false })
  writer: string;

  @Column({ type: 'varchar', length: 72, nullable: false })
  password: string;

  @OneToMany(() => Reply, reply => reply.id)
  @JoinColumn({ name: 'reply_id' })
  reply: Array<Reply>;
}