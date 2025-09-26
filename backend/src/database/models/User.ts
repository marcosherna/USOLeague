import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type userAuthProvider = "local" | "google" | "microsoft";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  imgProfile!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column({ nullable: true })
  password!: string;

  @Column({
    type: "enum",
    enum: ["local", "google", "microsoft"],
    default: "local",
  })
  authProvider!: userAuthProvider;

  @Column({ nullable: true })
  providerId!: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;
}
