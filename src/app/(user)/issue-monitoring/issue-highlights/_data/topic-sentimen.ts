import { ChartProps } from '@/types/types';

export const topicSentimen: ChartProps = {
  chartConfig: {
    value: {
      label: 'Value',
    },
    positive: {
      label: 'Positive',
    },
    negative: {
      label: 'Negative',
    },
    netral: {
      label: 'Netral',
    },
  },
  data: [
    { sentimen: 'positive', value: 275, fill: 'var(--chart-2)' },
    { sentimen: 'negative', value: 200, fill: 'var(--chart-1)' },
    { sentimen: 'netral', value: 187, fill: 'var(--chart-3)' },
  ],
};
