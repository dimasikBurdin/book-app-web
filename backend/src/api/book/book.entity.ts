import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum BookTypes {
  READ_NOW = "read_now",
  WANT_READ = "want_read",
  FINISHED = "finished",
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

  @Column({ type: "simple-array" }) // TODO
  public reviews: string[];

  @Column({ type: "varchar", default: "<fullBook>" }) // TODO
  public fullBook: string;

  @Column({
    type: "enum",
    enum: BookTypes,
    nullable: true,
  })
  public type: string;

  @Column({ type: "varchar", nullable: true }) // TODO
  public cover: string;
}
