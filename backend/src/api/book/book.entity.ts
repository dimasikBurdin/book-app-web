import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum BookTypes {
  FIRST = "first",
  SECOND = "second",
}

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "varchar", length: 120 })
  public name: string;

  @Column({ type: "varchar", length: 120, default: "descrition" })
  public description: string;

  @Column({ type: "integer", default: 5 })
  public rate: number;

  @Column({ type: "simple-array" }) //
  public reviews: string[];

  @Column({ type: "varchar", default: "<fullBook>" }) //
  public fullBook: string;

  @Column({ type: "enum", enum: BookTypes, default: BookTypes.FIRST }) //
  public type: string;
}
