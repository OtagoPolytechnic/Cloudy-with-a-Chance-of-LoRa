import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  calculateYAxisConfig,
  filterAndSortData,
  CustomXAxisTick,
} from '../../app/utils/chartUtils';

const LineChartComponent = ({ data, datakey, viewType }) => {
  const [isScrollEnabled, setIsScrollEnabled] = useState(
    window.innerWidth <= 1060,
  );
  const graphColor = '#113f67';
  const xyAxis = 'white';

  useEffect(() => {
    const handleResize = () => {
      setIsScrollEnabled(window.innerWidth <= 1060);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { domain, ticks } = calculateYAxisConfig(data, datakey);
  const xAxisDataKey = viewType === 'hourly' ? 'hour' : 'day';

  // Use the utility function for filtering and sorting data
  const filteredData = filterAndSortData(data, xAxisDataKey, viewType);

  // Adjust container width for scroll functionality
  const containerWidth =
    viewType !== '7days' && isScrollEnabled
      ? `${Math.max(filteredData.length * 50, window.innerWidth)}px`
      : '100%';

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        marginTop: '10px',
        overflowX:
          isScrollEnabled && viewType !== '7days' ? 'scroll' : 'hidden',
      }}
    >
      <div style={{ width: containerWidth }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={filteredData}
            margin={{ top: 10, right: 22, left: 0, bottom: 15 }}
          >
            <CartesianGrid stroke="white" strokeDasharray="5 5" />
            <XAxis
              dataKey={xAxisDataKey}
              stroke={xyAxis}
              tick={<CustomXAxisTick viewType={viewType} color={xyAxis} />}
              tickLine={{ transform: 'translateY(5px)' }}
              textAnchor="end"
              angle={-45}
              dy={10}
            />
            <YAxis
              type="number"
              domain={domain}
              ticks={ticks}
              stroke={xyAxis}
              allowDecimals={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: graphColor,
                borderRadius: '8px',
                padding: '5px',
              }}
              itemStyle={{ color: graphColor }}
              labelFormatter={() => ''}
            />
            <Line
              type="monotone"
              dataKey={datakey}
              stroke={graphColor}
              strokeWidth={2}
              dot={{ fill: graphColor, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;
