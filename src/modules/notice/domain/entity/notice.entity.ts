import { BaseEntity } from '@common/entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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