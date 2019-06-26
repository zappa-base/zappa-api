import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ScrapeStatus {
  PENDING = 'pending',
  ERROR = 'error',
  COMPLETED = 'completed',
}
@Entity()
export class Scrape {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public url: string;

  @Column({ nullable: true, type: 'json' })
  public data: string;

  @Column({ nullable: true })
  public type: string;

  @Column({
    default: ScrapeStatus.PENDING,
    enum: ScrapeStatus,
    type: 'enum',
  })
  public status: ScrapeStatus;

  @Column({ nullable: true })
  public deletedAt: Date;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
