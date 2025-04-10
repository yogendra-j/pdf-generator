/**
 * Environment variables with type safety and validation
 */

/**
 * Required environment variables
 */
const requiredEnvVars = {
  BROWSERLESS_TOKEN: process.env.BROWSERLESS_TOKEN || "",
} as const;

/**
 * Optional environment variables with defaults
 */
const optionalEnvVars = {
  NODE_ENV: process.env.NODE_ENV || "development",
} as const;

/**
 * Validates that all required environment variables are defined
 * @returns Array of missing environment variable names
 */
export const validateEnvVars = (): string[] => {
  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  return missingVars;
};

/**
 * Automatically validate environment variables
 */
const missingVars = validateEnvVars();
if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(", ")}`
  );
}

/**
 * Validated and typed environment variables
 */
export const env = {
  ...requiredEnvVars,
  ...optionalEnvVars,
};
