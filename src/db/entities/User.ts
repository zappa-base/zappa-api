import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ConfirmationToken } from './ConfirmationToken';
import { ResetToken } from './ResetToken';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    role: string;

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
