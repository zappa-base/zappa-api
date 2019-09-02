import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Base } from './Base';

export enum ScrapeStatus {
  PENDING = 'pending',
  ERROR = 'error',
  COMPLETED = 'completed',
}
@Entity()
export class Scrape extends Base {
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
}
