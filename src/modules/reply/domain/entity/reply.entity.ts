import { BaseEntity } from '@common/entity/base.entity';
import { Post } from '@post/domain/entity/post.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('replies')
export class Reply extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 1000, nullable: false })
  content: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  writer: string;

  @Column({ type: 'tinyint', nullable: false })
  is_child: boolean;

  @ManyToOne(() => Post, post => post.reply, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id'})
  post: Post;
  @Column({ type: 'bigint', nullable: false })
  post_id: number;

  @OneToOne(() => Reply, reply => reply.child)
  @JoinColumn({ name: 'parent_id' })
  parent: Reply;
  @Column({ type: 'bigint', nullable: true })
  parent_id: number;

  @OneToOne(() => Reply, reply => reply.parent, { onDelete: 'CASCADE' })
  child: Reply;
}