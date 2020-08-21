import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => MisList)
  @JoinTable()
  list: MisList[];

  @OneToMany(type => Admin, admin => admin.role)
  admins: Admin[];
}

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100
  })
  name: string;

  @Column()
  password: string;

  @ManyToOne(type => Role, role => role.admins)
  role: Role;
}

@Entity()
export class MisList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  router: string;

  @Column()
  parentId: number;
  [x: string]: any;
}