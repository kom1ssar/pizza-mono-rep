export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

export interface IUser {
  id: number;

  email: string;

  password: string;

  firstName?: string;

  address?: string;

  role: UserRole;
}
