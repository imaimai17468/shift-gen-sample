export const DEFAULT_USERS = ["A", "B", "C", "D", "E"] as const;

export type User = typeof DEFAULT_USERS[number];
