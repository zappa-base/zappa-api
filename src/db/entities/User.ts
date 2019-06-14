import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
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

    @Column()
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
}
