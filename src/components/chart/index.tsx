import { mergeAll } from 'ramda';
import * as React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { IInstrument } from '../../types'

const DETAIL = 10;

function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

interface IChartProps {
  data: IInstrument[]
}

export const SimpleLineChart = (props: { data: any, dataKeys: number[] }) => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={props.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      {props.dataKeys.map((item) => <Line key={item} type="monotone" dataKey={item} stroke={randomColor()} dot={false} />)}
    </LineChart >
  </ResponsiveContainer >
);

export default function (props: IChartProps) {
  if (!props.data[0]) {
    return null;
  }

  const chartData = props.data[0].timeSeries.entries.map((item, i) => ({
    name: item.d,
    ...mergeAll(props.data.map((e) => ({
      [e.instrumentId]: e.timeSeries.entries[i].n
    })))
  }))

  const detailData = chartData.length > (DETAIL * 20) ? chartData.filter((_, i) => i % DETAIL === 0) : chartData;

  return <SimpleLineChart data={detailData} dataKeys={props.data.map((item) => item.instrumentId)} />
}