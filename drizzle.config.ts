import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default {
    schema: "./db/schema.ts",
    out: "./db/migrations",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DB_URL!,
    },
} satisfies Config;