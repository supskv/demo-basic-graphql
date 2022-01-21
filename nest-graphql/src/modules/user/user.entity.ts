import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column username: string;

  @Column description?: string;

  @Column createdAt: Date;

  @Column updatedAt: Date;
}