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
  calculateYAxisConfig, // Helper to dynamically configure Y-axis range/ticks
  filterAndSortData, // Filters and sorts chart data based on viewType
  CustomXAxisTick, // Custom X-axis tick rendering component
} from '../../app/utils/chartUtils';

const LineChartComponent = ({ data, datakey, viewType }) => {
  // State to determine if chart should be scrollable based on screen width
  const [isScrollEnabled, setIsScrollEnabled] = useState(
    window.innerWidth <= 1060,
  );
  // State for responsive chart height
  const [chartHeight, setChartHeight] = useState(280);

  // Custom colors for chart styling
  const graphColor = '#113f67';
  const xyAxis = 'black';

  // Update scroll and chart height on screen resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsScrollEnabled(width <= 1060);
      setChartHeight(width < 480 ? 220 : width < 768 ? 260 : 280);
    };

    handleResize(); // Run initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get appropriate Y-axis settings and filtered chart data
  const { domain, ticks } = calculateYAxisConfig(data, datakey);
  const xAxisDataKey = viewType === 'hourly' ? 'hour' : 'day';
  const filteredData = filterAndSortData(data, xAxisDataKey, viewType);

  // Duplicate single-entry data to ensure chart renders properly
  const safeData =
    filteredData.length === 1
      ? [
          {
            ...filteredData[0],
            [xAxisDataKey]: `${filteredData[0][xAxisDataKey]} (1)`,
          },
          filteredData[0],
        ]
      : filteredData;

  // Determine width for scrollable charts (only if viewType is not 7days)
  const containerWidth =
    viewType !== '7days' && isScrollEnabled
      ? `${Math.max(safeData.length * 50, window.innerWidth)}px`
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
        <ResponsiveContainer width="100%" height={chartHeight}>
          <LineChart
            data={safeData}
            margin={{ top: 10, right: 22, left: 0, bottom: 15 }}
          >
            {/* Grid lines for better readability */}
            <CartesianGrid stroke="white" strokeDasharray="5 5" />

            {/* X-axis customization */}
            <XAxis
              dataKey={xAxisDataKey}
              stroke={xyAxis}
              tick={<CustomXAxisTick viewType={viewType} color={xyAxis} />}
              tickLine={{ transform: 'translateY(5px)' }}
              textAnchor="end"
              angle={-45}
              dy={10}
            />

            {/* Y-axis customization */}
            <YAxis
              type="number"
              domain={domain}
              ticks={ticks}
              stroke={xyAxis}
              allowDecimals={false}
              tickFormatter={(value) => (value < 10 ? value.toFixed(2) : value)}
              tick={{ fontSize: 12 }}
            />

            {/* Tooltip configuration */}
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: graphColor,
                borderRadius: '8px',
                padding: '5px',
              }}
              itemStyle={{ color: graphColor }}
              labelFormatter={() => ''} // Hide X-axis label in tooltip
            />

            {/* Main chart line */}
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
