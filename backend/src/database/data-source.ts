import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin",
  database: "uso_deportes_dev",
  entities: ["src/database/models/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  synchronize: false,
  logging: true,
});