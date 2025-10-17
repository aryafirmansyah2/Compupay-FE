export interface Issues {
  topic: string;
  subTopic: string;
  date: string;
  instagram: number;
  news: number;
  x: number;
  tiktok: number;
  facebook: number;
}

export interface TopicContentPerformanceData {
  text: string;
  platform: "Instagram" | "Tiktok" | "X" | "Facebook" | "News";
  likes: number;
  link: string;
  sentiment: "Positive" | "Negative" | "Netral";
}

export interface Topic {
  id: string;
  name: string;
  count: number;
  sentimen: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export interface subTopic {
  id: string;
  name: string;
  sub_topic: [Topic];
}
