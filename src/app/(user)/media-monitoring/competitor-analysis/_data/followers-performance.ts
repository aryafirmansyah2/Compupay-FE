import { ChartProps } from '@/types/types';

export const followersDatas: ChartProps = {
  chartConfig: {
    value: {
      label: 'Value',
    },
    Dishub: {
      label: 'Dishub',
    },
    Diskom: {
      label: 'Diskom',
    },
    Dinsos: {
      label: 'Dinsos',
    },
    SatpolPP: {
      label: 'SatpolPP',
    },
    Bupati: {
      label: 'Bupati',
    },
    Dinkes: {
      label: 'Dinkes',
    },
  },
  data: [
    { accountName: 'Dishub', value: 275, fill: 'var(--chart-1)' },
    { accountName: 'Diskom', value: 200, fill: 'var(--chart-2)' },
    { accountName: 'Dinsos', value: 187, fill: 'var(--chart-3)' },
    { accountName: 'SatpolPP', value: 173, fill: 'var(--chart-4)' },
    { accountName: 'Bupati', value: 90, fill: 'var(--chart-5)' },
    { accountName: 'Dinkes', value: 90, fill: 'var(--chart-6)' },
  ],
};
