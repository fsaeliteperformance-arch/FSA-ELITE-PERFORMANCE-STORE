/**
 * In-memory demo store for this sample integration.
 *
 * IMPORTANT:
 * - This data resets whenever the server restarts.
 * - This is intentionally simple for demonstration purposes only.
 * - In production, replace these Maps with durable database tables.
 */

const userToConnectedAccountMap = new Map<string, string>();

export function setUserConnectedAccount(userId: string, accountId: string) {
  userToConnectedAccountMap.set(userId, accountId);
}

export function getUserConnectedAccount(userId: string) {
  return userToConnectedAccountMap.get(userId) ?? null;
}
