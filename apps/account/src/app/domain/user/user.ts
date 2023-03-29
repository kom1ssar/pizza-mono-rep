import { IUser, UserRole } from '@pizza-mono-rep/interfaces';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { compare, hash } from 'bcrypt';
import { UserCreateDto } from './dto/user-create.dto';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ nullable: true })
  public firstName?: string;

  @Column({ nullable: true })
  public address?: string;

  @Column({ default: UserRole.CLIENT, enum: UserRole, type: 'enum' })
  public role: UserRole;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;

  @BeforeInsert()
  private async setPassword(): Promise<void> {
    this.password = await hash(this.password, 7);
  }

  public async passwordCompare(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }

  public createByDto(dto: UserCreateDto): this {
    this.email = dto.email;
    this.password = dto.password;
    this.address = dto.address !== undefined ? dto.address : null;
    this.firstName = dto.firstName !== undefined ? dto.firstName : null;
    return this;
  }
}
