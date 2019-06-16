import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class ResetToken {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    token: string;

    @Column({ nullable: true })
    resetAt: Date;

    @Column({ nullable: true })
    deletedAt: Date;

    @Column({ nullable: true })
    invalidatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => User, user => user.resetTokens, { cascade: true, onDelete: 'CASCADE' })
    user: User;
}
