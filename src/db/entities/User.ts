import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Base } from './Base';
import { ConfirmationToken } from './ConfirmationToken';
import { ResetToken } from './ResetToken';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
  SUSPENDED = 'suspended',
}

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

@Entity()
export class User extends Base {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public nickname: string;

  @Index()
  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({
    default: UserRole.USER,
    enum: UserRole,
    type: 'enum',
  })
  public role: UserRole;

  @Column({
    default: UserStatus.INACTIVE,
    enum: UserStatus,
    type: 'enum',
  })
  public status: UserStatus;

  @Column({ nullable: true })
  public confirmedAt: Date;

  @OneToMany(
    () => ConfirmationToken,
    (confirmationToken) => confirmationToken.user,
  )
  public confirmationTokens: ConfirmationToken[];

  @OneToMany(() => ResetToken, (resetToken) => resetToken.user)
  public resetTokens: ResetToken[];

  @BeforeInsert()
  @BeforeUpdate()
  public lowerCaseEmail() {
    if (this.email) {
      this.email = this.email.toLowerCase();
    }
  }
}
