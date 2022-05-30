import { CreateDateColumn, UpdateDateColumn } from "typeorm";

/**
 * 기본 엔티티
 * 생성일자와 수정일자 필드가 필요한 엔티티는 상속할 것
 */
export abstract class BaseEntity {
  /**
   * 생성일자
   */
  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  /**
   * 수정일자
   */
  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}