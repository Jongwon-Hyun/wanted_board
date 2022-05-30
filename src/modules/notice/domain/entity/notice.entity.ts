import { BaseEntity } from '@common/entity/base.entity';
import { Post } from '@post/domain/entity/post.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 알림 엔티티
 */
@Entity('notices')
export class Notice extends BaseEntity {
  /**
   * ID
   */
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  /**
   * 작성자
   */
  @Column({ type: 'varchar', length: 20, nullable: false })
  writer: string;

  /**
   * 키워드
   */
  @Column({ type: 'varchar', length: 20, nullable: false })
  keword: string;
}