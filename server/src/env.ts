import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  AZURE_OPENAI_ENDPOINT: z.url(),
  AZURE_OPENAI_KEY: z.string(),
  DATABASE_URL: z.url(),
  // NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const result = envSchema.safeParse(process.env);
if (result.success === false) {
  console.error("❌ Variables d'environnement invalides :");
  console.table(z.treeifyError(result.error).properties);
  process.exit(1);
}
export const env = result.data;
