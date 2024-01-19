import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique:true})
  email: string;
  
  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text', nullable:true, unique:true })
  username: string;
  
  @Column({ type: 'enum', enum: ['admin', 'user', 'premiumUser'] })
  role: string;

}
