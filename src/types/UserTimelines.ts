export type UserTimelines = {
  user: string;
  timeline: {
    time: string;
    task: string | null;
  }[];
}[];
