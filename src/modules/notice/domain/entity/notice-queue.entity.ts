import { BaseEntity } from "@common/entity/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * 알림 큐 엔티티
 */
@Entity('notice_queues')
export class NoticeQueue extends BaseEntity {
  /**
   * ID
   */
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  /**
   * 작업 ID
   */
  @Column({ type: 'bigint', nullable: true })
  job_id: number;

  /**
   * 작업 대상
   */
  @Column({ type: 'varchar', nullable: false })
  job_type: string;
}