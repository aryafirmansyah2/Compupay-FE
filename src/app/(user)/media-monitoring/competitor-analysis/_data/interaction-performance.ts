import { ChartProps } from '@/types/types';

export const interactionDatas: ChartProps = {
  chartConfig: {
    value: {
      label: 'Value',
    },
  },
  data: [
    { accountName: 'A', value: 275, fill: 'var(--chart-1)' },
    { accountName: 'B', value: 200, fill: 'var(--chart-2)' },
    { accountName: 'C', value: 187, fill: 'var(--chart-3)' },
    { accountName: 'D', value: 173, fill: 'var(--chart-4)' },
    { accountName: 'E', value: 90, fill: 'var(--chart-5)' },
    { accountName: 'F', value: 90, fill: 'var(--chart-6)' },
  ],
};
