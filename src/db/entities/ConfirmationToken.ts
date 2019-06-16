import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class ConfirmationToken {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    token: string;

    @Column({ nullable: true })
    confirmedAt: Date;

    @Column({ nullable: true })
    deletedAt: Date;

    @Column({ nullable: true })
    invalidatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => User, user => user.confirmationTokens, { cascade: true, onDelete: 'CASCADE' })
    user: User;
}
