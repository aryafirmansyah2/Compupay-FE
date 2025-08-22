interface TopicProps {
  id: string;
  topic: string;
  countMentions: number;
  positiveMentions: number;
  negativeMentions: number;
  netralMentions: number;
  subTopic?: {
    id: string;
    subTopic: string;
    countMentions: number;
    positiveMentions: number;
    negativeMentions: number;
    netralMentions: number;
  }[];
}

// Perbaikan data JSON
export const topic: TopicProps[] = [
  {
    id: 'e10ccba2-59a1-4130-a610-baf367be0509',
    topic: 'Kecerdasan Buatan',
    countMentions: 1200,
    positiveMentions: 800,
    negativeMentions: 250,
    netralMentions: 150,
    subTopic: [
      {
        id: 'e10ccba2-59a1-4130-a610-baf367be0510',
        subTopic: 'Perubahan Iklim',
        countMentions: 980,
        positiveMentions: 600,
        negativeMentions: 200,
        netralMentions: 180,
      },
      {
        id: 'e10ccba2-59a1-4130-a610-baf367be0511',
        subTopic: 'Blockchain Teknologi',
        countMentions: 670,
        positiveMentions: 450,
        negativeMentions: 100,
        netralMentions: 120,
      },
    ],
  },
  {
    id: 'f10ccba2-59a1-4130-a610-baf367be0512',
    topic: 'Perubahan Iklim',
    countMentions: 980,
    positiveMentions: 600,
    negativeMentions: 200,
    netralMentions: 180,
    subTopic: [
      {
        id: 'f10ccba2-59a1-4130-a610-baf367be0513',
        subTopic: 'Kepanasan Global',
        countMentions: 800,
        positiveMentions: 500,
        negativeMentions: 150,
        netralMentions: 150,
      },
    ],
  },
  {
    id: 'g10ccba2-59a1-4130-a610-baf367be0514',
    topic: 'Kryptocurrency',
    countMentions: 540,
    positiveMentions: 300,
    negativeMentions: 150,
    netralMentions: 90,
  },
  {
    id: 'h10ccba2-59a1-4130-a610-baf367be0515',
    topic: 'Realitas Virtual',
    countMentions: 800,
    positiveMentions: 500,
    negativeMentions: 150,
    netralMentions: 150,
  },
];
