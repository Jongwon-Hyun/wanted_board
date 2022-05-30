import { BaseEntity } from "@common/entity/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('notice_queues')
export class NoticeQueue extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: true })
  job_id: number;

  @Column({ type: 'varchar', nullable: false })
  job_type: string;
}