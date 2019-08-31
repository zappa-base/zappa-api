import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Album {
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

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
