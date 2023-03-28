import { IUser, UserRole } from '@pizza-mono-rep/interfaces';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { compare, hash } from 'bcrypt';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: UserRole.CLIENT, enum: UserRole, type: 'enum' })
  role: UserRole;

  @BeforeInsert()
  private async setPassword(): Promise<void> {
    this.password = await hash(this.password, 7);
  }

  async passwordCompare(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }
}
