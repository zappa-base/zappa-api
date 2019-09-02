import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Base } from './Base';

@Entity()
export class Album extends Base {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public catalogNumber: string;

  @Column()
  public label: string;

  @Column()
  public releaseDate: Date;

  @Column()
  public title: string;

  @Column({ nullable: true })
  public coverArtUrl: string;
}
