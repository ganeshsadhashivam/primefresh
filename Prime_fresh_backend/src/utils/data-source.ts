import dotenv from "dotenv";
dotenv.config(); // Loads environment variables from .env into process.env

import "reflect-metadata";
import { DataSource } from "typeorm";

// Directly read environment variables
const postgresConfig = {
  host: process.env.DATABASE_HOST || "localhost",
  port: parseInt(process.env.DATABASE_PORT || "5432", 10),
  username: process.env.DATABASE_USER || "postgres",
  password: process.env.DATABASE_PASSWORD || "1992",
  database: process.env.DATABASE_DB || "user_prime",
};

console.log("Postgres Config: ", postgresConfig);

export const AppDataSource = new DataSource({
  ...postgresConfig,
  type: "postgres",
  synchronize: true,
  logging: false,
  entities: ["src/entities/**/*.entity.{ts,js}"],
  //migrations: ["src/migrations/**/*{.ts,.js}"],
  subscribers: ["src/subscribers/**/*{.ts,.js}"],
  // ssl: {
  //   rejectUnauthorized: false // You may need to set this to true in production with proper certificates
  // }
});
