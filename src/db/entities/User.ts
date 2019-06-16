import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nickname: string;

    @Index()
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.INACTIVE,
    })
    status: UserStatus;

    @Column({ nullable: true })
    confirmedAt: Date;

    @Column({ nullable: true })
    deletedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => ConfirmationToken, confirmationToken => confirmationToken.user)
    confirmationTokens: ConfirmationToken[];

    @OneToMany(type => ResetToken, resetToken => resetToken.user)
    resetTokens: ResetToken[];

    @BeforeInsert()
    @BeforeUpdate()
    lowerCaseEmail() {
        if (this.email) {
            this.email = this.email.toLowerCase();
        }
    }
}
