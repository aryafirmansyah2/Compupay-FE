import { ChartProps } from '@/types/types';

export const activityDatas: ChartProps = {
  chartConfig: {
    value: {
      label: 'Value',
      fill: 'var(--primary)',
    },
  },
  data: [
    { accountName: 'Dishub', value: 275 },
    { accountName: 'Diskom', value: 200 },
    { accountName: 'Dinsos', value: 187 },
    { accountName: 'SatpolPP', value: 173 },
    { accountName: 'Bupati', value: 90 },
    { accountName: 'Dinkes', value: 90 },
  ],
};
