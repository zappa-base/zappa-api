import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class ConfirmationToken {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    token: string;

    @Column()
    confirmedAt: Date;

    @Column()
    deletedAt: Date;

    @Column()
    invalidatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => User, user => user.confirmationTokens)
    user: User;
}
