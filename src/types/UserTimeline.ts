export type UserTimeline = {
  user: string;
  timeline: {
    time: string;
    task: string | null;
  }[];
};
