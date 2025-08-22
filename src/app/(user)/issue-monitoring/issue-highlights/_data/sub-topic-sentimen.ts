import { ChartProps } from '@/types/types';

interface SubTopicSentimen {
  positive: ChartProps;
  negative: ChartProps;
  netral: ChartProps;
}

export const subTopicSentimen: SubTopicSentimen = {
  positive: {
    chartConfig: {
      value: {
        label: 'Value',
      },
    },
    data: [
      { subTopic: 'Mangrove', value: 69, fill: 'var(--chart-2)' },
      { subTopic: 'Kinerja', value: 49, fill: 'var(--chart-2)' },
      { subTopic: 'Jalan', value: 20, fill: 'var(--chart-2)' },
    ],
  },
  negative: {
    chartConfig: {
      value: {
        label: 'Value',
      },
    },
    data: [
      { subTopic: 'Mangrove', value: 69, fill: 'var(--chart-1)' },
      { subTopic: 'Kinerja', value: 49, fill: 'var(--chart-1)' },
      { subTopic: 'Jalan', value: 20, fill: 'var(--chart-1)' },
    ],
  },
  netral: {
    chartConfig: {
      value: {
        label: 'Value',
      },
    },
    data: [
      { subTopic: 'Mangrove', value: 69, fill: 'var(--chart-3)' },
      { subTopic: 'Kinerja', value: 49, fill: 'var(--chart-3)' },
      { subTopic: 'Jalan', value: 20, fill: 'var(--chart-3)' },
    ],
  },
};
