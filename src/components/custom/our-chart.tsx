import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  Sector,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';
import { ChartProps } from '@/types/types';
import { ContentType as TooltipContentType } from 'recharts/types/component/Tooltip';
import { ContentType as LegendContentType } from 'recharts/types/component/DefaultLegendContent';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
import { Margin } from 'recharts/types/util/types';

export interface BarChartProps extends ChartProps {
  margin?: Margin;
  minTickGap?: number;
  tooltipContent?: TooltipContentType<ValueType, NameType>;
  xTickFormatter?: (value: any) => string;
  yTickFormatter?: (value: any) => string;
  xKey?: string;
  yKey?: string;
}

export function OurBarChart({
  chartConfig,
  xKey,
  data,
  minTickGap = 30,
  xTickFormatter = (value) => String(value),
  tooltipContent: TooltipContent,
}: BarChartProps) {
  const config = chartConfig satisfies ChartConfig;

  return (
    <ChartContainer
      config={config}
      className="h-full w-full flex-1 aspect-auto"
    >
      {data && (
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={xKey}
            tickLine={false}
            tickMargin={10}
            minTickGap={minTickGap}
            axisLine={false}
            tickFormatter={xTickFormatter}
          />
          <ChartTooltip
            cursor={false}
            content={TooltipContent ?? <ChartTooltipContent indicator="dot" />}
          />
          {Object.entries(config).map(([key, value]) => (
            <Bar key={key} dataKey={key} fill={value.fill} radius={4} />
          ))}
        </BarChart>
      )}
    </ChartContainer>
  );
}

export function OurBarChartV2({
  chartConfig,
  xKey,
  data,
  xTickFormatter = (value) => String(value),
  tooltipContent: TooltipContent,
}: BarChartProps) {
  const config = chartConfig satisfies ChartConfig;

  return (
    <ChartContainer
      config={config}
      className="h-full w-full flex-1 aspect-auto"
    >
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={xTickFormatter}
        />
        <ChartTooltip
          cursor={false}
          content={TooltipContent ?? <ChartTooltipContent hideLabel />}
        />
        {Object.entries(config).map(([key]) => (
          <Bar key={key} dataKey={key} layout="horizontal" radius={5}>
            <LabelList
              dataKey={key}
              position="insideTop"
              offset={20}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        ))}
      </BarChart>
    </ChartContainer>
  );
}

export function OurHorizontalBarChart({
  chartConfig,
  data,
  margin = { left: 0 },
  yKey,
  yTickFormatter = (value) => String(value),
  xKey,
  xTickFormatter = (value) => String(value),
  tooltipContent: TooltipContent,
}: BarChartProps) {
  const config = chartConfig satisfies ChartConfig;

  return (
    <ChartContainer
      config={config}
      className="h-full w-full flex-1 aspect-auto"
    >
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={margin}
      >
        <YAxis
          dataKey={yKey}
          type="category"
          tickLine={false}
          tickMargin={0}
          axisLine={false}
          tickFormatter={yTickFormatter}
        />
        <XAxis
          dataKey={xKey}
          type="number"
          hide
          tickFormatter={xTickFormatter}
        />
        <ChartTooltip
          cursor={false}
          content={TooltipContent ?? <ChartTooltipContent hideLabel />}
        />
        {Object.entries(config).map(([key]) => (
          <Bar key={key} dataKey={key} layout="vertical" radius={5}>
            <LabelList
              dataKey={xKey}
              position="insideRight"
              offset={20}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        ))}
      </BarChart>
    </ChartContainer>
  );
}

export interface AreaChartProps extends ChartProps {
  tooltipContent?: TooltipContentType<ValueType, NameType>;
  xTickFormatter?: (value: any) => string;
  xKey: string;
}

export function OurAreaChart({
  chartConfig,
  xKey,
  data,
  xTickFormatter = (value) => String(value),
  tooltipContent: TooltipContent,
}: AreaChartProps) {
  const config = chartConfig satisfies ChartConfig;

  return (
    <ChartContainer
      config={config}
      className="h-full w-full flex-1 aspect-auto"
    >
      {data && (
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={xKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={24}
            tickFormatter={xTickFormatter}
          />
          <ChartTooltip
            cursor={false}
            content={TooltipContent ?? <ChartTooltipContent indicator="dot" />}
          />
          <defs>
            {Object.entries(config).map(([key, value]) => (
              <linearGradient key={key} id={key} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={value.fill} stopOpacity={0.8} />
                <stop offset="95%" stopColor={value.fill} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>
          {Object.entries(config).map(([key, value]) => (
            <Area
              key={key}
              dataKey={key}
              type="natural"
              fill={`url(#${key})`}
              fillOpacity={0.4}
              stroke={value.fill}
              stackId="a"
            />
          ))}
        </AreaChart>
      )}
    </ChartContainer>
  );
}

export interface LineChartProps extends ChartProps {
  tooltipContent?: TooltipContentType<ValueType, NameType>;
  xTickFormatter?: (value: any) => string;
  xKey: string;
}

export function OurLineChart({
  chartConfig,
  xKey,
  data,
  xTickFormatter = (value) => String(value),
  tooltipContent: TooltipContent,
}: LineChartProps) {
  const config = chartConfig satisfies ChartConfig;

  return (
    <ChartContainer
      config={config}
      className="h-full w-full flex-1 aspect-auto"
    >
      {data && (
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={xKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={14}
            tickFormatter={xTickFormatter}
          />
          <ChartTooltip
            cursor={false}
            content={TooltipContent ?? <ChartTooltipContent indicator="dot" />}
          />
          {Object.entries(config).map(([key, value]) => (
            <Line
              key={key}
              dataKey={key}
              type="natural"
              stroke={value.fill}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      )}
    </ChartContainer>
  );
}

export interface RadarChartProps extends ChartProps {
  dataKey: string;
  tooltipContent?: TooltipContentType<ValueType, NameType>;
}

export function OurRadarChart({
  chartConfig,
  data,
  dataKey,
  tooltipContent: TooltipContent,
}: RadarChartProps) {
  const config = chartConfig satisfies ChartConfig;

  return (
    <ChartContainer
      config={config}
      className="h-full w-full flex-1 aspect-auto"
    >
      {data && (
        <RadarChart data={data}>
          <ChartTooltip
            cursor={false}
            content={TooltipContent ?? <ChartTooltipContent />}
          />
          <PolarAngleAxis dataKey={dataKey} />
          <PolarGrid />
          {Object.entries(config).map(([key, value]) => (
            <Radar
              key={key}
              dataKey={key}
              fill={value.fill}
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          ))}
        </RadarChart>
      )}
    </ChartContainer>
  );
}

export interface PaiChartType extends ChartProps {
  dataKey: string;
  nameKey: string;
  activeIndex?: number;
  innerRadius?: number;
  tooltipContent?: TooltipContentType<ValueType, NameType>;
  legendContent?: LegendContentType;
}

export function OurPieChart({
  chartConfig,
  data,
  dataKey,
  nameKey,
  innerRadius = 60,
  tooltipContent: TooltipContent,
  legendContent: LegendContent,
}: PaiChartType) {
  const config = chartConfig satisfies ChartConfig;

  return (
    <ChartContainer
      config={config}
      className="h-full w-full flex-1 aspect-auto"
    >
      {data && (
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={TooltipContent ?? <ChartTooltipContent hideLabel />}
          />

          <ChartLegend
            content={
              typeof LegendContent === 'function'
                ? (props) => LegendContent(props)
                : LegendContent ?? (
                    <ChartLegendContent
                      nameKey={nameKey}
                      className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                    />
                  )
            }
            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
          />

          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            innerRadius={innerRadius}
          />
        </PieChart>
      )}
    </ChartContainer>
  );
}

export function OurPieChartV2({
  chartConfig,
  data,
  dataKey,
  nameKey,
  activeIndex = 0,
  innerRadius = 60,
  tooltipContent: TooltipContent,
  legendContent: LegendContent,
}: PaiChartType) {
  const config = chartConfig satisfies ChartConfig;

  return (
    <ChartContainer
      config={config}
      className="h-full w-full flex-1 aspect-auto"
    >
      {data && (
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={
              TooltipContent ?? (
                <ChartTooltipContent nameKey={dataKey} labelKey={nameKey} />
              )
            }
          />

          <ChartLegend
            content={<ChartLegendContent nameKey={nameKey} />}
            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
          />

          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            innerRadius={innerRadius}
            strokeWidth={5}
            activeIndex={activeIndex}
            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
              <Sector {...props} outerRadius={outerRadius + 10} />
            )}
          />
        </PieChart>
      )}
    </ChartContainer>
  );
}
