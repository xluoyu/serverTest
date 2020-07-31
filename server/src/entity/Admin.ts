import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column({
    length: 100
  })
  name: string;

  @Column()
  password: string;

  @Column()
  role: number;
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: string;

  @Column()
  list: string;
}

@Entity()
export class MisList {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: string;

  @Column()
  router: string;
}