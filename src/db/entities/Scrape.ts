import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

export enum ScrapeStatus {
    PENDING = 'pending',
    ERROR = 'error',
    COMPLETED = 'completed',
}
@Entity()
export class Scrape {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    url: string;

    @Column({ nullable: true, type: 'json' })
    data: string;

    @Column({ nullable: true })
    type: string;

    @Column({
        type: 'enum',
        enum: ScrapeStatus,
        default: ScrapeStatus.PENDING,
    })
    status: ScrapeStatus;

    @Column({ nullable: true })
    deletedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}