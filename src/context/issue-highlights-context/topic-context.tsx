"use client";
import React, { createContext, useContext, useState } from "react";

// Define context types
interface Topic {
  id: string;
  topic: string;
  countMentions: number;
  positiveMentions: number;
  negativeMentions: number;
  netralMentions: number;
}

interface TopicContextType {
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loadMoreData: () => void;
}

const TopicContext = createContext<TopicContextType | undefined>(undefined);

export const TopicProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMoreData = () => {
    if (loading) return;
    setLoading(true);
    // Simulate fetching from API (replace with actual API call)
    setTimeout(() => {
      const newTopics = [
        // Add some dummy data here
        {
          id: `${topics.length + 1}`,
          topic: `Topic ${topics.length + 1}`,
          countMentions: Math.floor(Math.random() * 100),
          positiveMentions: Math.floor(Math.random() * 50),
          negativeMentions: Math.floor(Math.random() * 30),
          netralMentions: Math.floor(Math.random() * 20),
        },
      ];
      setTopics((prev) => [...prev, ...newTopics]);
      setLoading(false);
    }, 1000);
  };

  return (
    <TopicContext.Provider
      value={{ topics, setTopics, loading, setLoading, loadMoreData }}
    >
      {children}
    </TopicContext.Provider>
  );
};

export const useTopicContext = (): TopicContextType => {
  const context = useContext(TopicContext);
  if (!context) {
    throw new Error("useTopicContext must be used within a TopicProvider");
  }
  return context;
};
