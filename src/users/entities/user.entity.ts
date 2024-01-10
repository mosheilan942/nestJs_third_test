import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  username: string;

  @Column({ type: 'text'})
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'enum', enum: ['m', 'f'] })
  gender: string;
  /**
   * m - male
   * f - female
   */

  @Column({ type: 'text', default:"", nullable:true })
  refreshToken: string;
}
