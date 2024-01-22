export const DEFAULT_TASKS = [
  "調理場管理",
  "案内所",
  "巡回",
  "ゴミ箱管理",
  "駐車場待機"
] as const;

export type Task = typeof DEFAULT_TASKS[number];
