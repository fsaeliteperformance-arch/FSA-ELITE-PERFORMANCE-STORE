/**
 * Reads a required environment variable and throws with a helpful setup hint
 * when the value is missing.
 */
export function getRequiredEnvVar(envVarName: string, placeholderHint: string) {
  const value = process.env[envVarName]?.trim();
  if (!value) {
    throw new Error(
      `Missing ${envVarName} environment variable. ${placeholderHint}`,
    );
  }
  return value;
}
