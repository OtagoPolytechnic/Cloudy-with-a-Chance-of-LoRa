import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
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

const BarChartComponent = ({ data, datakey, viewType }) => {
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

  // Adjust container width based on view type to prevent squishing for the 7-day view
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
          viewType !== '7days' && isScrollEnabled ? 'scroll' : 'hidden',
      }}
    >
      <div style={{ width: containerWidth }}>
        <ResponsiveContainer width="100%" height={600}>
          <BarChart
            data={filteredData}
            margin={{ top: 20, right: 22, left: 0, bottom: 15 }}
          >
            <CartesianGrid stroke="white" strokeDasharray="5 5" />
            <XAxis
              dataKey={xAxisDataKey}
              stroke={xyAxis}
              tick={<CustomXAxisTick viewType={viewType} color={xyAxis} />}
              interval={0}
            />
            <YAxis
              type="number"
              domain={domain}
              ticks={ticks}
              stroke={xyAxis}
              allowDecimals={false}
              tick={{ fontSize: 14 }}
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
            <Bar dataKey={datakey} fill={graphColor} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;
