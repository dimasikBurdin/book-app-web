import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "varchar", length: 120 })
  public name: string;

  @Column({ type: "varchar", length: 120 })
  public author: string;

  @Column({ type: "varchar", length: 120, default: "descrition" })
  public description: string;

  @Column({ type: "integer", default: 5 })
  public rate: number;

  @Column({ type: "simple-array", default: [] }) // TODO
  public reviews: string[];

  @Column({ type: "varchar", default: "<fullBook>" }) // TODO
  public fullBook: string;

  @Column({ type: "varchar", nullable: true }) // TODO
  public cover: string;
}
