import { Column, Entity, ManyToOne } from 'typeorm';

import { Base } from './Base';
import { User } from './User';

export enum SessionType {
  JWT = 'jwt',
}

@Entity()
export class Session extends Base {
  @Column()
  public type: SessionType;

  @ManyToOne(() => User, (user) => user.sessions, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public user: User;
}
