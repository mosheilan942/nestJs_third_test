import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable:true, unique:true})
  email: string;
  
  @Column({ type: 'text', nullable:true })
  password: string;

  @Column({ type: 'text', nullable:true, unique:true })
  username: string;
  
  // @Column({ type: 'text' })
  // name: string;

  // @Column({ type: 'int' })
  // age: number;


  // @Column({ type: 'enum', enum: ['m', 'f'] })
  // gender: string;
  /**
   * m - male
   * f - female
   */

  // @Column({ type: 'text', default:"", nullable:true })
  // refreshToken: string;
}
