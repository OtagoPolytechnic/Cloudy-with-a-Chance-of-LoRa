/*
'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function LineChartComponent({ data, dataKey, unit, timeRange }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsSmallScreen(window.innerWidth < 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // X-axis tick formatter based on time range
  const formatXAxis = (tick) => {
    if (timeRange === 'Hourly' || timeRange === '1 Day') {
      return tick; // e.g. "10:00"
    } else if (timeRange === '7 Days') {
      return tick; // e.g. "Mon"
    } else if (timeRange === '30 Days') {
      return tick.replace('Day ', 'D'); // e.g. "Day 1" → "D1"
    } else if (timeRange === 'Statistics') {
      return tick; // e.g. "Avg"
    }
    return tick;
  };

  const xAxisProps = {
    dataKey: 'time',
    tickFormatter: formatXAxis,
    tick: { fontSize: isSmallScreen ? 10 : 12 },
    angle: -25,
    textAnchor: 'end',
    height: 40,
    interval: 0,
  };

  if (isSmallScreen) {
    const chartWidth = Math.max(data.length * 50, 300);

    return (
      <div className="overflow-x-auto w-full pb-2" style={{ height: 280 }}>
        <div style={{ width: chartWidth, height: '100%' }}>
          <LineChart
            data={data}
            width={chartWidth}
            height={280}
            margin={{ top: 10, right: 20, left: 10, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis {...xAxisProps} />
            <YAxis unit={unit} tick={{ fontSize: 10 }} width={35} />
            <Tooltip
              contentStyle={{ fontSize: '12px' }}
              labelStyle={{ fontSize: '12px' }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#000000"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis {...xAxisProps} />
          <YAxis unit={unit} tick={{ fontSize: 12 }} width={40} />
          <Tooltip
            contentStyle={{ fontSize: '12px' }}
            labelStyle={{ fontSize: '12px' }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#000000"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
*/
