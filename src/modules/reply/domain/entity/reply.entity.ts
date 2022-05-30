import { BaseEntity } from '@common/entity/base.entity';
import { Post } from '@post/domain/entity/post.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 댓글 엔티티
 */
@Entity('replies')
export class Reply extends BaseEntity {
  /**
   * 댓글 ID
   */
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  /**
   * 내용
   */
  @Column({ type: 'varchar', length: 1000, nullable: false })
  content: string;

  /**
   * 작성자
   */
  @Column({ type: 'varchar', length: 20, nullable: false })
  writer: string;

  /** 
   * 대댓글 플래그
   */
  @Column({ type: 'tinyint', nullable: false })
  is_child: boolean;

  @ManyToOne(() => Post, post => post.reply, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id'})
  post: Post;
  /**
   * 게시글 ID
   */
  @Column({ type: 'bigint', nullable: false })
  post_id: number;

  @OneToOne(() => Reply, reply => reply.child)
  @JoinColumn({ name: 'parent_id' })
  parent: Reply;
  /**
   * 대댓글의 부모 댓글 ID
   */
  @Column({ type: 'bigint', nullable: true })
  parent_id: number;

  @OneToOne(() => Reply, reply => reply.parent, { onDelete: 'CASCADE' })
  child: Reply;
}