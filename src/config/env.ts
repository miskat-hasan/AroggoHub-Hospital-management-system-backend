import { configDotenv } from "dotenv";
import path from "path";

configDotenv({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.MONGO_URI as string,
  node_env: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET as string,
  jwt_expires_in: (process.env.JWT_EXPIRES_IN as string) || "1d",
  gmail_user: process.env.GMAIL_USER as string,
  gmail_pass: process.env.GMAIL_PASSWORD as string,
};
