import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text', nullable: true, unique: true })
  username: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user', 'premiumUser'],
    nullable: true,
  })
  role: string;
}
