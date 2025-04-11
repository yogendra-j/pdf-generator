const requiredEnvVars = {
  BROWSERLESS_TOKEN: process.env.BROWSERLESS_TOKEN || "",
} as const;

const optionalEnvVars = {
  NODE_ENV: process.env.NODE_ENV || "development",
} as const;

export const validateEnvVars = (): string[] => {
  const missingVars = Object.entries(requiredEnvVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  return missingVars;
};

const missingVars = validateEnvVars();
if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(", ")}`
  );
}

export const env = {
  ...requiredEnvVars,
  ...optionalEnvVars,
};
