import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './User';

@Entity()
export class ConfirmationToken {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public token: string;

  @Column({ nullable: true })
  public confirmedAt: Date;

  @Column({ nullable: true })
  public deletedAt: Date;

  @Column({ nullable: true })
  public invalidatedAt: Date;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => User, (user) => user.confirmationTokens, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public user: User;
}
