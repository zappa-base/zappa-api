import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Base } from './Base';
import { User } from './User';

@Entity()
export class ConfirmationToken extends Base {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public token: string;

  @Column({ nullable: true })
  public confirmedAt: Date;

  @Column({ nullable: true })
  public invalidatedAt: Date;

  @ManyToOne(() => User, (user) => user.confirmationTokens, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public user: User;
}
